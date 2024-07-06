import { db } from "../db";

export const getVerificationByEmail = async (email) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

export const getVerificationByToken = async (token) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (err) {
    // console.log(err);
    return null;
  }
};
