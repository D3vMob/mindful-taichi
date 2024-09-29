"use client";
import { updateUserName } from "~/lib/firebase/auth";
import { auth } from "~/lib/firebase/firebase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Pencil, Save } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export const DisplayName = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const user = auth.currentUser;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (user) {
        await updateUserName(user, values.username);
      }
    } catch (error) {
      console.error("Error updating display name:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className="flex flex-col max-w-48">
      
      {isUpdating ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter a username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Save size={24} onClick={form.handleSubmit(onSubmit)} className="cursor-pointer" />
          </form>
        </Form>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span>
            {user?.displayName ? user?.displayName : user?.email?.split("@")[0]}
          </span>
          <Pencil size={16} onClick={() => setIsUpdating(!isUpdating)} className="cursor-pointer" />
        </div>
      )}
    </div>
  );
};
