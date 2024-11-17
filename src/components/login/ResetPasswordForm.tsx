"use client";
import { useState } from "react";
import { authService } from "~/services/authService";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AuthMode } from "~/types/auth";

interface ResetPasswordFormProps {
  setAuthMode: (mode: AuthMode) => void;
}

export function ResetPasswordForm({ setAuthMode }: ResetPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.resetPassword(email);
      toast.success("パスワードリセットメールを送信しました。");
      setAuthMode(AuthMode.SIGN_IN);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "リセットに失敗しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="メール"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "送信中..." : "パスワードをリセット"}
        </Button>

        <button
          type="button"
          onClick={() => setAuthMode(AuthMode.SIGN_IN)}
          className="text-sm text-primary hover:underline"
        >
          サインイン
        </button>
      </div>
    </form>
  );
}
