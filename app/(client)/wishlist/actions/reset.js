"use server";

import { getUserByEmail } from "@/lib/helpers";
import { generatePasswordResetToken } from "@/lib/helpers/tokens";
import { SendResetPasswordEmail } from "@/lib/mailService";
import { ResetSchema } from "@/schemas";

export const reset = async (values) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await SendResetPasswordEmail(
    //TODO
    "intelligentlederberg@fearlessmails.com",
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
