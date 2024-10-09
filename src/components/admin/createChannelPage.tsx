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
} from "../ui/form";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { type Channels } from "~/server/db/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const channelSchema = z.object({
  name: z.string().min(2).max(50),
  shortName: z.string().min(2).max(4),
  description: z.string().min(2).max(256),
  active: z.boolean(),
  playlistId: z.string(),
});

interface channelData {
  channel: Channels;
}
export const CreateChannel = ({ params }: { params: { idSlug: string } }) => {
  const form = useForm<z.infer<typeof channelSchema>>({
    values: {
      name: "",
      shortName: "",
      description: "",
      active: false,
      playlistId: "",
    },
    resolver: zodResolver(channelSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (params.idSlug === "0") return;

    const fetchData = async () => {
      try {
        const result = await fetch(`/api/channels/${params.idSlug}`);
        if (!result.ok) {
          throw new Error("Failed to fetch channel data");
        }
        const channelData = (await result.json()) as channelData;
        // Reset form with fetched data
        form.reset({
          name: channelData.channel.name,
          shortName: channelData.channel.shortName,
          description: channelData.channel.description ?? "",
          active: channelData.channel.active,
          playlistId: channelData.channel.playlistId,
        });
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };
    void fetchData();
  }, [form, params.idSlug]);

  const onSubmit = async (data: z.infer<typeof channelSchema>) => {
    try {
      const method = params.idSlug === "0" ? "POST" : "PUT"; // Use PUT for updates
      const url =
        params.idSlug === "0"
          ? `/api/channels`
          : `/api/channels/${params.idSlug}`;
      const result = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!result.ok) {
        throw new Error("Failed to save channel");
      }
      router.push("/nav/admin");
    } catch (error) {
      console.error("Error saving channel:", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter channel name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter channel short name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mention key details about the channel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value === "1")}
                defaultValue={field.value ? "1" : "0"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Active</SelectItem>
                  <SelectItem value="0">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playlistId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter channel ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
