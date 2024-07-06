"use client";

import { postRfq } from "@/actions/post-rfq";
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

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// formSchema -> ProductFormValues -> ProductForm using react hook form -> onSubmit -> update store

export const RfqForm = ({ initialData }) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const router = useRouter();
  const {
    data: {
      user: { address },
    },
  } = useSession();

  const [open, setOpen] = useState(false);

  const title = initialData ? "Edit RFQ" : "Create a new RFQ";

  const description = initialData ? "Edit your Quote" : "Create a new RFQ";

  const toastMessage = initialData
    ? "Quote updated successfully"
    : "Quote created successfully";

  const action = initialData ? "Save Quote" : "Create Product";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        images: [],
        phone: address?.phone,
        notes: "",
      };

  const form = useForm({
    resolver: zodResolver(RfqSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    startTransition(() => {
      if (initialData) {
      } else {
        postRfq(data).then((res) => {
          if (res?.error) {
            toast.error(res.error);
          }

          if (res?.success) {
            toast.success(res.success);
            router.refresh();
            router.push(`/rfq`);
          }
        });
      }
    });
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
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={isPending}
                    onChange={(url) => {
                      // Get the current value of the images field
                      const currentImages = form.getValues("images");

                      // Update the images field with the new image appended
                      const updatedImages = [...currentImages, { url }];
                      form.setValue("images", updatedImages);
                    }}
                    onRemove={(url) => {
                      const filteredImages = field.value.filter(
                        (current) => current.url !== url
                      );
                      field.onChange(filteredImages);
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
                      disabled={isPending}
                      placeholder="Provide Phone number"
                      {...field}
                      type="number"
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
                      disabled={isPending}
                      placeholder="add notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isPending} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </Container>
  );
};
