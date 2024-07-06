"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { generateVerificationToken } from "@/lib/helpers/tokens";
import { SendVerificationEmail } from "@/lib/mailService";

export const login = async (values, callbackUrl) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await SendVerificationEmail(
      //TODO
      "intelligentlederberg@fearlessmails.com",
      verificationToken.token
    );
    return {
      success: `Verification email sent to ${existingUser.email}`,
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    // TODO security
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          redirect(callbackUrl);
      }
    }

    throw error;
  }
};
