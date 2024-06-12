import express from "express";
import { deleteUserById, getUsers, updateUserById } from "../db/users";
import { authentication, random } from "../helpers";

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

    const salt = random();

    const values = {
      ...(username && { username }),
      ...(password && {
        authentication: { salt, password: authentication(salt, password) },
      }),
    };

    const user = await updateUserById(req.params.id, values);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
