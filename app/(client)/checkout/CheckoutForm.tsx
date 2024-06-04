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
import { ShippingAddressSchema } from "@/schemas";
import { Order } from "./Order";
export const CheckoutForm = () => {
  const form = useForm<z.infer<typeof ShippingAddressSchema>>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      city: "",
      country: "",
      email: "",
      fullName: "",
      state: "",
      streetAddress: "",
      zipCode: undefined,
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className=" w-full flex items-start justify-between"
      >
        <div className="w-[640px] pr-28 border-r border-slate-300 ">
          <h1 className="text-neutral-black font-bold text-[16px] mb-16">
            Shipping Address
          </h1>
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 mt-4 mb-12">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coutry</FormLabel>
                  <FormControl>
                    <Input placeholder="Coutry" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Order />
      </form>
    </Form>
  );
};