"use server";
import nodemailer from "nodemailer";
import { env } from "~/env";

// Define environment variables
const SMTP_EMAIL = env.SMTP_EMAIL;
const SMTP_PASSWORD = env.SMTP_PASSWORD;
const SITE_MAIL_RECIEVER = "default@recipient.com";

// Custom interface for transporter options and mail sending
interface CustomSentMessageInfo {
  messageId: string;
  envelope: {
    from: string;
    to: string[];
  };
  accepted: string[];
  rejected: string[];
  pending: string[];
  response: string;
}

interface CustomTransporter {
  verify(): Promise<boolean>;
  sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
  }): Promise<CustomSentMessageInfo>;
}

// Create a custom transporter and type it with CustomTransporter
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const transporter: CustomTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
}) as unknown as CustomTransporter;

// Define the sendMail function with strong types
export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: {
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<CustomSentMessageInfo | void> {
  try {
    const isVerified: boolean = await transporter.verify();
    console.log("SMTP connection verified:", isVerified);
  } catch (error) {
    console.error("Error during SMTP verification:", error);
    return;
  }

  try {
    const info: CustomSentMessageInfo = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: sendTo ?? SMTP_EMAIL,
      subject: subject,
      text: text,
      html: html ?? "",
    });

    return info;
  } catch (error) {
    console.error("Error sending mail:", error);
    return;
  }
}
