// lib/db.js
const { PrismaClient } = require("@prisma/client");

// Prevent multiple Prisma clients in dev (HMR)
global.prisma = global.prisma || new PrismaClient();

const db = global.prisma;

module.exports = db;
