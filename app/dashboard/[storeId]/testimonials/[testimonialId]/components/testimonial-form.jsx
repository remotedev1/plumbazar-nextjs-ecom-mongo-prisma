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
import { Textarea } from "@/components/ui/textarea";
import { TestimonialSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const TestimonialForm = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Testimonial" : "Create Testimonial";
  const description = initialData
    ? "Edit Testimonial details"
    : "Add a new Testimonial";
  const toastMessage = initialData
    ? "Testimonial updated successfully"
    : "Testimonial created successfully";
  const action = initialData ? "Save Changes" : "Create Testimonial";

  const form = useForm({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: initialData || {
      name: "",
      address: "",
      images: [],
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("message", data.message);
      formData.append("organization", data.organization);
      formData.append("designation", data.designation);
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
          `/api/testimonials/${params.testimonialId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post(`/api/testimonials`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      toast.success(toastMessage);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete store
      await axios.delete(
        `/api/testimonials/${params.testimonialId}`
      );
      router.refresh();

      router.push("/");
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you removed all products from this testimonials before deleting it "
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-5">
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
      <Separator className="my-2" />

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
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image)}
                    disabled={loading}
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-5 max-w-lg">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Testimonial..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="organization..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="designation..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message*</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="message..."
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
    </div>
  );
};
