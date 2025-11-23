import prisma from "../../startup/dbClient.js";

export function findByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export function create(data) {
  return prisma.user.create({ data });
}

export function findById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

// Directly access mongoBD
