"use client"; // Ensure this file is a client component

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OfferSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/ui/heading";
import MultiSelect from "@/components/common/multi-selelct";
import ProductMultiSelect from "./product-multi-slect";

export const OfferForm = ({ initialData, brands, categories }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
console.log(initialData)
  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      discountPercentage: initialData?.discountPercentage ?? 0,
      validFrom: initialData?.validFrom ?? null,
      validUntil: initialData?.validUntil ?? null,
      productIds: initialData?.productIds ?? [],
      brandIds: initialData?.brandIds ?? [],
      categoryIds: initialData?.categoryIds ?? [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/offers/${initialData.id}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products/offers`, data);
      }
      router.refresh();
      toast.success("Offer created/updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full my-5">
      <div className="flex items-center justify-between">
        <Heading title={initialData ? "Edit Offer" : "Create Offer"} />
      </div>
      <Separator className="my-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="flex flex-col gap-5 max-w-lg">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Offer title" {...field} />
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
                    <Input placeholder="Offer description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Discount percentage"
                      {...field}
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="validFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Controller
                      name="validFrom"
                      control={form.control}
                      render={({ field: { value, onChange } }) => (
                        <DatePicker
                          selectedDate={value}
                          onDateChange={onChange}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      selectedDate={field.value}
                      onDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Brand selection */}
            <FormField
              control={form.control}
              name="brandIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brands</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Select brands"
                      options={brands.map((brand) => ({
                        label: brand.name,
                        value: brand.id,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category selection */}
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Select categories"
                      options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                      }))}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product selection */}
            <FormField
              control={form.control}
              name="productIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Products</FormLabel>
                  <FormControl>
                    <Controller
                      name="productIds"
                      control={form.control}
                      render={({ field }) => (
                        <ProductMultiSelect
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {loading
              ? "Submitting..."
              : initialData
              ? "Save Changes"
              : "Create Offer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
