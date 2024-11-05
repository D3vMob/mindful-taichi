"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "../ui/textarea";
import { sendMail } from "~/lib/sendMail";
import { toast } from "sonner";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
const contactSchema = z.object({
  email: z.string().email("メールが不完全であるか、正しい形式ではありません"),
  title: z
    .string()
    .min(1, { message: "タイトルは少なくとも 1 文字以上である必要があります" }),
  message: z
    .string()
    .min(10, { message: "メッセージは10文字以上である必要があります" }),
});
export default function Inquiry() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      title: "",
      message: "",
    },
  });
  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true);
    try {
      const result = await sendMail({
        subject: values.title,
        text: values.message,
        html: `<p>${values.message}</p>`,
      });
      if (result?.accepted.length === 0) return;
      toast.success("送信が完了しました");
    } catch (error) {
      console.error(error);
      toast.error("送信に失敗しました");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }
  return (
    <>
      <Form {...form}>
        <h3 className="text-center text-lg font-bold">お問い合わせ</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="電子メール"
                    {...field}
                    className="bg-white"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="題"
                    {...field}
                    className="bg-white"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="メッセージ"
                    {...field}
                    className="bg-white"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-20"
              disabled={isLoading || !form.formState.isValid}
            >
              {isLoading ? <LoaderCircle className="animate-spin" /> : "送信"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
