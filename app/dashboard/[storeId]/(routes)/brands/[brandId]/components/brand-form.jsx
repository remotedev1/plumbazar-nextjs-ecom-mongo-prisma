"use client";

import { AlertModal } from "@/components/models/alert-modal";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { BrandSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const BrandForm = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Brand" : "Create Brand";
  const description = initialData ? "Edit brand details" : "Add a new brand";
  const toastMessage = initialData
    ? "Brand updated successfully"
    : "Brand created successfully";
  const action = initialData ? "Save Changes" : "Create Brand";

  const form = useForm({
    resolver: zodResolver(BrandSchema),
    defaultValues: initialData || {
      name: "",
      images: [],
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);

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
          `/api/brands/${params.brandId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`/api/brands`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      router.refresh();
      toast.success("Brand created/updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/brands/${params.brandId}`);
      router.refresh();
      router.push("/");
      toast.success("Brand deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you removed all products from this brand before deleting it "
      );
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
          className="space-y-8 w-full "
        >
          <div className="flex flex-col gap-5 max-w-lg">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Brand..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value.map((image) => image)}
                      onChange={(newImage) => {
                        field.onChange([newImage]);
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
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? "Submitting..." : action}
          </Button>
        </form>
      </Form>
    </>
  );
};
