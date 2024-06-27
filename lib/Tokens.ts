import { db } from "@/db/db";
import { getResetTokenByEmail, getVerificationTokenByEmail } from "@/db/tokens";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken)
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  const verficationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires_at: expires, //set one hour of validity for the token ,
    },
  });
  return verficationToken;
};

export const generateResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getResetTokenByEmail(email);
  if (existingToken)
    await db.resetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  const resetToken = await db.resetToken.create({
    data: {
      token,
      email,
      expires_at: expires, //set one hour of validity for the token ,
    },
  });
  return resetToken;
};
