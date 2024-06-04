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
import { useEffect, useState, useTransition } from "react";
import { addShippingAddress } from "@/actions/profile";
import { Button } from "@/components/ui/button";
import { ShippingAddress } from "@prisma/client";
import { getUserShippingAddress } from "@/db/queries";
export const Address = () => {
  const [address, setAddress] = useState<ShippingAddress | null>();
  useEffect(() => {
    const getData = async () => {
      const userAddress = await getUserShippingAddress();
      setAddress(userAddress);
    };
    getData()
  }, []);

  const form = useForm<z.infer<typeof ShippingAddressSchema>>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      city: address ? address.city : "",
      country: address ? address.country : "",
      state: address ? address.state : "",
      streetAddress: address ? address.streetAddress : "",
      zipCode: address ? address.zipCode : undefined,
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSave = (values: z.infer<typeof ShippingAddressSchema>) => {
    startTransition(() => {
      addShippingAddress(values);
    });
  };

  return (
    <section className="w-full">
      <h3 className="text-[16px] text-neutral-black font-semibold">
        Shipping Address
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className=" space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Street Address"
                    {...field}
                  />
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
                    <Input disabled={isPending} placeholder="City" {...field} />
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
                    <Input
                      disabled={isPending}
                      placeholder="State"
                      {...field}
                    />
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
                    <Input
                      disabled={isPending}
                      placeholder="Zip Code"
                      {...field}
                    />
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
                    <Input
                      disabled={isPending}
                      placeholder="Coutry"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>

        <Button
          disabled={isPending}
          className="bg-neutral-black text-white font-medium h-11 rounded px-6 mt-16 hover:bg-opacity-80"
        >
          Save Changes
        </Button>
      </Form>
    </section>
  );
};
