"use client";
import { sendMail } from "~/lib/sendMail";
import { Button } from "../ui/button";

export default function TestEmail() {
  const handleSubmit = () => {
    void sendMail({
      sendTo: "desbiensa1@gmail.com",
      subject: "Test Email",
      text: "This is a test email",
    });
  };
  return <Button onClick={() => handleSubmit()}>send EMAIL</Button>;
}
