"use client";
import { useState } from "react";
import { AuthMode } from "~/types/auth";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function AuthLayout() {
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.SIGN_IN);

  const renderAuthComponent = () => {
    switch (authMode) {
      case AuthMode.SIGN_UP:
        return <SignUpForm setAuthMode={setAuthMode} />;
      case AuthMode.RESET_PASSWORD:
        return <ResetPasswordForm setAuthMode={setAuthMode} />;
      default:
        return <SignInForm setAuthMode={setAuthMode} />;
    }
  };

  const getTitle = () => {
    switch (authMode) {
      case AuthMode.SIGN_UP:
        return "サインアップ";
      case AuthMode.RESET_PASSWORD:
        return "パスワードをリセット";
      default:
        return "ログイン";
    }
  };

  return (
    <div className="-mt-16 flex min-h-screen min-w-full items-center justify-center px-4">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="text-center">{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent>{renderAuthComponent()}</CardContent>
      </Card>
    </div>
  );
}
