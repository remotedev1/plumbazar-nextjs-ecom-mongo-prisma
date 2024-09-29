"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
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
import { Textarea } from "@/components/ui/textarea";

import { RfqSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

// formSchema -> ProductFormValues -> ProductForm using react hook form -> onSubmit -> update store

export const RfqForm = ({ initialData }) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const {
    data: {
      user: { address },
    },
  } = useSession();

  const title = initialData ? "Edit RFQ" : "Create a new RFQ";

  const action = initialData ? "Save Quote" : "Create RFQ";

  const defaultValues = {
    notes: initialData?.notes ?? "",
    images: initialData?.images ?? [],
    phone: initialData?.phone ?? address?.phone,
  };

  const form = useForm({
    resolver: zodResolver(RfqSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("notes", data.notes);

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
          `/api/${params.storeId}/rfq/${params.brandId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`/api/rfq`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      router.push("/rfq");
      toast.success("Quote created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title={title} />
      </div>
      <Separator className="my-6" />
      {/* Form  and spreading the form using react hook form */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
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
                      field.onChange([...field.value, newImage]);
                    }}
                    disabled={loading}
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
          <div className="max-w-lg">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Provide Phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="max-w-lg">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="add notes..."
                      {...field}
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
    </Container>
  );
};
