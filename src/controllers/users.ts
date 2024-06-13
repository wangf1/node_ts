import express from "express";
import {
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../db/users";
import { authentication, random } from "../helpers";
import User from "../types/User";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

//please implement delete user
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await deleteUserById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, password } = req.body;
    if (!username && !password) {
      return res.status(400).send("Please specify username and/or password.");
    }

    const user = (await getUserById(req.params.id).select(
      "+authentication.salt +authentication.password"
    )) as User;

    const newUserName: string | null =
      username !== user.username ? username : null;

    const expectedHash = authentication(user.authentication.salt, password);
    let newPassword: string | null = null;
    if (user.authentication.password !== expectedHash) {
      newPassword = password;
    }

    if (!newUserName && !newPassword) {
      return res
        .status(400)
        .send("Please specify updated username and/or password to update.");
    }

    const salt = random();
    const values = {
      ...(newUserName && { username }),
      ...(newPassword && {
        authentication: { salt, password: authentication(salt, newPassword) },
      }),
    };

    const updatedUser = await updateUserById(req.params.id, values);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
