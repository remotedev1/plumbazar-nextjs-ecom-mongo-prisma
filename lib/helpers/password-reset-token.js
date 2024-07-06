import { db } from "../db";

export const getPasswordResetTokenByEmail = async (email) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const  getPasswordResetTokenByToken = async (token) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (err) {
    // console.log(err);
    return null;
  }
};
