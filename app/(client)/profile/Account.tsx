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
import { changeNameEmailSchema } from "@/schemas";
import { useSession } from "next-auth/react";
export const Account = () => {
  const form = useForm<z.infer<typeof changeNameEmailSchema>>({
    resolver: zodResolver(changeNameEmailSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });
  const { data, status } = useSession();
  return (
    <section className=" w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">
        Account Details
      </h3>
      <div className="w-12 h-12 rounded-full bg-slate-200/50 text-blue-600 mt-10 flex justify-center items-center uppercase font-medium text-xl">
        {status === "authenticated" && data?.user?.name?.slice(0, 1)}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className=" space-y-4 mt-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Full name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <button className="bg-neutral-black text-white font-medium h-11 rounded px-6 mt-16 hover:bg-opacity-80">
            Save Changes
          </button>
        </form>
      </Form>
    </section>
  );
};
