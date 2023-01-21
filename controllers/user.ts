import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user";

const router = express.Router();

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  const newUser = new User({
    username,
  });

  try {
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
  }
};

// get a user by id
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// delete a user by id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  await User.findByIdAndRemove(id);

  res.json({ message: "user deleted successfully." });
};

// update a user by id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { username: username },
    { new: true }
  );

  res.json(updatedUser);
};

export default router;
