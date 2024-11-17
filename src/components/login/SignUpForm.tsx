"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "~/services/authService";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { AuthMode } from "~/types/auth";

interface SignUpFormProps {
  setAuthMode: (mode: AuthMode) => void;
}

export function SignUpForm({ setAuthMode }: SignUpFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("パスワードが一致しません");
      return;
    }

    setIsLoading(true);

    try {
      await authService.signUp(email, password);
      router.push("/login");
      setAuthMode(AuthMode.SIGN_IN);
      toast.success("アカウントが正常に作成されました!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "サインアップに失敗しました",
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
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          required
        />
        <Input
          type="password"
          placeholder="パスワードの確認"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "アカウントを作成中..." : "アカウントを作成"}
        </Button>

        <button
          type="button"
          onClick={() => setAuthMode(AuthMode.SIGN_IN)}
          className="text-sm text-primary hover:underline"
        >
          すでにアカウントをお持ちですか？サインイン
        </button>
      </div>
    </form>
  );
}
