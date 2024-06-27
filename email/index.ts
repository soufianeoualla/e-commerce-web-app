import { Resend } from "resend";
import WelcomeTemplate from "./template/Welcome";
import ResetPassword from "./template/ResetPassword";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (
  email: string,
  name: string,
  token: string
) => {
  const link = `${domain}/auth/verification?token=${token}`;

  await resend.emails.send({
    from: "Ecommerce Store <store@soufian.me>",
    to: email,
    subject: "Confirm your email",
    react: WelcomeTemplate({ name, confirmationLink: link }),
  });
};

export const sendResetLinkEmail = async (
  email: string,
  name: string,
  token: string
) => {
  const link = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Reset Password <store@soufian.me>",
    to: email,
    subject: "Reset your password",
    react: ResetPassword({ name, resetPasswordLink: link }),
  });
};
