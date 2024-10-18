"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";

import { AlertModal } from "@/components/models/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductSchema } from "@/schemas";
import { Textarea } from "@/components/ui/textarea";

export const ProductForm = ({ initialData, brands, categories }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit a Product" : "Create a new Product";
  const description = initialData
    ? "Edit your Product"
    : "Create a new Product";

  const action = initialData ? "Save Changes" : "Create Product";

  const defaultValues = {
    name: initialData?.name ?? "",
    images: initialData?.images ?? [],
    purchasedPrice: initialData?.purchasedPrice
      ? parseFloat(String(initialData.purchasedPrice))
      : null,
    brandId: initialData?.brandId ?? "",
    description: initialData?.description ?? "",
    gst: initialData?.gst ?? 18,
    categoryId: initialData?.categoryId ?? "",
    isFeatured: initialData?.isFeatured ?? false,
    isArchived: initialData?.isArchived ?? false,
    msp: initialData?.msp ?? null,
    mrp: initialData?.mrp ?? null,
  };

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mrp", data.mrp);
      formData.append("msp", data.msp);
      formData.append("purchasedPrice", data.purchasedPrice);
      formData.append("brandId", data.brandId);
      formData.append("description", data.description);
      formData.append("gst", data.gst);
      formData.append("categoryId", data.categoryId);
      formData.append("isFeatured", data.isFeatured ? true : false);
      formData.append("isArchived", data.isArchived ? true : false);

      // Append images, which can be either URLs or files
      data.images.forEach((fileOrUrl, index) => {
        if (typeof fileOrUrl === "string") {
          // If the image is a URL, append it as a string
          formData.append("images", fileOrUrl);
        } else if (fileOrUrl instanceof File) {
          // If the image is a File object, append it as a file
          formData.append("newImages", fileOrUrl);
        }
      });

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          formData
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      router.refresh();
      toast.success("Product created/updated successfully");
    } catch (error) {
      toast.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/dashboard/${params.storeId}/products`);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  max-w-5xl mx-auto"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image)}
                    disabled={loading}
                    onChange={(newImage) => {
                      field.onChange([...field.value, newImage]);
                    }}
                    onRemove={(id) => {
                      field.onChange(
                        field.value.filter(
                          (image, index) =>
                            index !== id &&
                            (!image.publicId || image.publicId !== id)
                        )
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retail price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="mrp"
                      {...field}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="msp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="msp"
                      {...field}
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a brand"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select a category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
                      disabled={loading}
                      placeholder="Product description"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a GST" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {[0, 5, 12, 18, 28].map((gst) => (
                          <SelectItem key={gst} value={gst.toString()}>
                            {gst}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>Featured</TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Featured products will be displayed on the
                                homepage
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>Archived</TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Archived products will be hidden from your store
                                but you can still access them from your
                                dashboard and unarchive them at any time.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? "Submitting..." : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
