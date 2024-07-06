import { v4 as uuidv4 } from "uuid";
import { getVerificationByEmail } from "./verification-token";
import { db } from "../db";
import { getPasswordResetTokenByEmail } from "./password-reset-token";

export const generateVerificationToken = async (email) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 3600 * 1000; // 1 hour

  const existingToken = await getVerificationByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email) => {
  const token = uuidv4();
  const expires = new Date().getTime() + 3600 * 1000; // 1 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return passwordResetToken;
};
