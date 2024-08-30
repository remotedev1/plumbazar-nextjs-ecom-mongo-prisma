"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { postAddress } from "@/actions/post-address";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export function ShippingAddress() {
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();

  // Ensure that default values are always defined to avoid uncontrolled to controlled warnings
  const form = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      address: session?.user?.address?.address || "",
      city: session?.user?.address?.city || "",
      state: session?.user?.address?.state || "",
      zip: session?.user?.address?.zip || "",
      phone: session?.user?.address?.phone || "",
    },
  });

  const onSubmit = (data) => {
    startTransition(() => {
      postAddress(data).then((result) => {
        if (result.error) {
          toast.error(result.error);
        } else if (result.success) {
          toast.success(result.success);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="City" />
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
                <Input {...field} placeholder="State" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Zip Code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Phone Number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
