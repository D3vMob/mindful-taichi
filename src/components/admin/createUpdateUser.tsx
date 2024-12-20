"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";
import { Loader2Icon, X } from "lucide-react";
import { type InsertUser, type Channels, type Users } from "~/server/db/schema";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  handleCreateUserFirebase,
  handleCustomClaim,
} from "~/lib/firebase/auth";
import { sendMail } from "~/lib/sendMail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { refreshUsers } from "~/lib/actions";

const userSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  surname: z.string().min(2).max(50).optional(),
  role: z.string().default("user").optional(),
  email: z.string().email().optional(),
  section: z.string().optional(),
  uuid: z.string().optional(),
});

interface userData {
  user: Users;
}

export const CreateUpdateUser = ({
  params,
  selections,
}: {
  params: { idSlug: string };
  selections: Channels[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<string[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof userSchema>>({
    values: {
      name: "",
      surname: "",
      role: "user",
      email: "",
      section: "",
      uuid: "",
    },
    resolver: zodResolver(userSchema),
  });
  useEffect(() => {
    if (params.idSlug === "0") return;

    const fetchData = async () => {
      try {
        const result = await fetch(`/api/users/${params.idSlug}`);
        if (!result.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = (await result.json()) as userData;
        const currentUserData = userData.user;
        form.reset({
          name: currentUserData.name ?? "",
          surname: currentUserData.surname ?? "",
          email: currentUserData.email ?? "",
          section: currentUserData.section ?? "",
          role: currentUserData.role ?? "",
          uuid: currentUserData.uuid ?? "",
        });
        if (currentUserData.section) {
          const newSections = currentUserData.section.split("/");
          setSections(newSections);
          form.setValue("section", newSections.join("/"));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchData();
  }, [form, params.idSlug]);

  const handleAddSection = (section: string) => {
    if (!sections.includes(section)) {
      const newSections = [...sections, section];
      setSections(newSections);
      form.setValue("section", newSections.join("/"));
    }
  };

  const handleRemoveSection = (section: string) => {
    const newSections = sections.filter((s) => s !== section);
    setSections(newSections);
    form.setValue("section", newSections.join("/"));
  };

  const joinedSections = useCallback(() => {
    return sections.join("/");
  }, [sections]);

  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    setIsLoading(true);
    if (params.idSlug !== "0") {
      try {
        await fetch(`/api/users/${params.idSlug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error("Failed to update user");
            }
            await handleCustomClaim(params.idSlug, {
              role: data.role ?? "user",
            });
          })
          .then(async () => {
            await refreshUsers();
          })
          .then(() => {
            setIsLoading(false);
            router.push("/nav/admin");
          });
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      try {
        if (!data.email) return;
        await handleCreateUserFirebase(data.email).then(async (userData) => {
          if (!userData) return;
          const newData = {
            ...data,
            uuid: userData.user.user.uid ?? "",
          } as InsertUser;
          const result = await fetch(`/api/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          });
          if (!result.ok) {
            throw new Error("Failed to create user");
          }

          toast("ユーザーの作成に成功しました", {
            description: new Date().toLocaleString(),
          });
          void sendMail({
            sendTo: data.email,
            subject: "アカウント設定 / Account settings",
            text: "",
            html: `<p>まず、メールアドレスの確認を行いますので、以下のリンクをクリックしてください。</p> 
            <p>Please verify your account by clicking on the following link</p> 
            <p><a href="${userData.user.verify}">メールアドレスを確認する / Verify Email</a></p>
            <p>次に、下のリンクをクリックして、ログインするためのパスワードを作成してください。</p> 
            <p>And please generate a NEW password in 
            order to login, by clicking on the following link </p>
            <p><a href="${userData.user.reset}">パスワードを作成してください / Reset Password</a></p>`,
          });
        });
        await refreshUsers().then(() => {
          router.push("/nav/admin");
        });
      } catch (error) {
        toast("ユーザー作成エラー");
      }
    }
  };

  return (
    <div className="md:max-w-[27.5rem]">
      <h1 className="pt-2 text-center">
        {params.idSlug !== "0" ? "ユーザーの更新" : "ユーザーを作成"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-4">
            <div className="pb-2 md:flex md:flex-col">
              <div className="md:flex md:w-[30rem] md:items-center md:gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="チャンネル名を入力"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>姓</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="姓を入力"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex md:w-[30rem] md:items-center md:gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子メール</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="メールアドレスを入力"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>役</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ? field.value : "user"}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-[13.5rem]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">管理者</SelectItem>
                            <SelectItem value="user">参加者</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>セクション</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Select
                        onValueChange={handleAddSection}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="max-w-[27.5rem]">
                          <SelectValue placeholder="セクションを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {selections.map((section) => (
                            <SelectItem
                              key={section.id}
                              value={section.shortName}
                            >
                              {section.shortName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {sections.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sections.map((section) => (
                            <Badge key={section} variant="secondary">
                              {section}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0"
                                onClick={() => handleRemoveSection(section)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Input
                        {...field}
                        readOnly
                        value={joinedSections() ?? ""}
                        className="hidden"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="animate-spin" />}
              {isLoading ? " 送信..." : "送信"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
