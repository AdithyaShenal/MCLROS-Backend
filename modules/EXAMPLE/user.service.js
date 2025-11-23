import * as userRepository from "./user.repository.js";
import bcrypt from "bcrypt";

export async function createUser(data) {
  const existing = await userRepository.findByEmail(data.email);
  if (existing) throw new Error("User already exists");

  const hash = await bcrypt.hash(data.password, 10);

  return userRepository.create({
    ...data,
    password: hash,
  });
}

export async function getUserById(id) {
  const user = await userRepository.findById(id);
  if (!user) throw new Error("User not found");
  return user;
}
