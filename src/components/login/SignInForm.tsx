"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "~/services/authService";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AuthMode } from "~/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "~/lib/firebase/authValidations";
import { Form } from "../ui/form";

interface SignInFormProps {
  setAuthMode: (mode: AuthMode) => void;
}

export function SignInForm({ setAuthMode }: SignInFormProps) {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: SignInInput) => {
    try {
      await authService.signIn(data);
      router.push("/");
      toast.success("サインインに成功しました!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "サインインに失敗しました",
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="メール"
            {...form.register("email")}
            disabled={isSubmitting}
            required
          />
          <Input
            type="password"
            placeholder="パスワード"
            {...form.register("password")}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "サインイン中..." : "サインイン"}
          </Button>

          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={() => setAuthMode(AuthMode.SIGN_UP)}
              className="text-primary hover:underline"
            >
              アカウントを作成する
            </button>
            <button
              type="button"
              onClick={() => setAuthMode(AuthMode.RESET_PASSWORD)}
              className="text-primary hover:underline"
            >
              パスワードをリセット
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}
