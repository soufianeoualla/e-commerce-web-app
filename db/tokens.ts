import { db } from "./db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verficationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.resetToken.findFirst({
      where: { email },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};

export const getResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.resetToken.findFirst({
      where: { token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
};
