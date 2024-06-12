import express from "express";
import { deleteUserById, getUsers } from "../db/users";

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
