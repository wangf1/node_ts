import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { random, authentication } from '../helpers';
import User from '../types/User';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.body);

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).send('User already exists');
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(201).json(user).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('All fields are required');
        }

        const userDoc = await getUserByEmail(email).select('+authentication.salt +authentication.password');


        if (!userDoc) {
            return res.status(404).send('User not found');
        }

        const user = userDoc as User;

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(401).send('Incorrect password');
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, userDoc._id.toString());
        await userDoc.save();

        res.cookie('token', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/'
        });
        return res.status(200).json(user).end();
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}