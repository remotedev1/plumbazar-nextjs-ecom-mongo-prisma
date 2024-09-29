"use client"; // Ensure this file is a client component

import { useState } from "react";
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
  const [selectedProducts, setSelectedProducts] = useState(
    initialData?.products ?? []
  );

  const form = useForm({
    resolver: zodResolver(OfferSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      discountPercentage: initialData?.discountPercentage ?? 0,
      validFrom: initialData?.validFrom ?? null,
      validUntil: initialData?.validUntil ?? null,
      productIds: initialData?.productIds ?? [],
      brandIds: initialData?.brands ?? [], // Changed from `brands` to `brandIds`
      categoryIds: initialData?.categories ?? [], // Changed from `categories` to `categoryIds`
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

  const handleRemoveProduct = (productId) => {
    // Filter out the removed product
    const updatedProductIds = selectedProducts
      .filter((product) => product.id !== productId)
      .map((product) => product.id); // Ensure it's the ID that you pass to form

    // Update the state and form
    setSelectedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
    form.setValue("productIds", updatedProductIds);
  };

  return (
    <div className="w-full my-5">
      <div className="flex items-center justify-between">
        <Heading title={initialData ? "Edit Offer" : "Create Offer"} />
      </div>
      <Separator className="my-5" />
      <div className="w-full flex flex-col md:flex-row justify-between space-x-8">
        <Form {...form} className="flex-1">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-5">
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
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
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
                name="brandIds" // Match with form default values
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
                        value={field.value} // Ensure this reflects selected options
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
                name="categoryIds" // Match with form default values
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
                        value={field.value} // Ensure this reflects selected options
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
        {initialData && (
          <div className="flex-1">
            <h1 className="text-3xl mb-4">Products</h1>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border-b">No.</th>
                    <th className="p-2 border-b">Name</th>
                    <th className="p-2 border-b">ID</th>
                    {/* Uncomment if needed */}
                    {/* <th className="p-2 border-b">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{index + 1}</td>
                      <td className="p-2 border-b">{product.name}</td>
                      <td className="p-2 border-b">{product.id}</td>
                      {/* Uncomment if needed */}
                      {/* <td className="p-2 border-b">
                <Button
                  type="button"
                  onClick={() => handleRemoveProduct(product.id)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
