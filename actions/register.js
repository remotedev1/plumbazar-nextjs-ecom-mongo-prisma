"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/helpers";
import { generateVerificationToken } from "@/lib/helpers/tokens";
import { SendVerificationEmail } from "@/lib/mailService";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values, callbackUrl) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await SendVerificationEmail(
    email,
    verificationToken.token
  );
  return {
    success: `Verification email sent to ${verificationToken.email}`,
  };
};
