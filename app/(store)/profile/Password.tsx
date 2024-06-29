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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/schemas";
import { FormSucces } from "@/components/auth/FormSucces";
import { FormError } from "@/components/auth/FormError";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/actions/profile";
import { useState, useTransition } from "react";
export const Password = () => {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      confirmPassword: "",
      oldPassword: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const handleChangePassword = (
    values: z.infer<typeof changePasswordSchema>
  ) => {
    startTransition(() => {
      changePassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <section className=" w-[50%]">
      <h3 className="text-[16px] text-neutral-black font-semibold">
        Change Password
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleChangePassword)}
          className=" space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {success && <FormSucces message={success} />}
          {error && <FormError message={error} />}

          <Button
            disabled={isPending}
            className="bg-neutral-black text-white font-medium h-11 rounded px-6 mt-6 hover:bg-opacity-80"
          >
            Change password
          </Button>
        </form>
      </Form>
    </section>
  );
};
