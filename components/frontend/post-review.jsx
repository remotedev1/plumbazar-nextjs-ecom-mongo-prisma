"use client";

import { postReview } from "@/actions/post-review";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Star } from "lucide-react";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import Rating from "react-rating";
import { Textarea } from "../ui/textarea";

export const PostReview = ({ setOpen, productId }) => {
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState(null);
  const [review, setReview] = useState(null);
  const [isPending, startTransition] = useTransition();

  const reset = () => {
    setRating(null);
    setTitle(null);
    setReview(null);
  };

  const onSubmit = async (data) => {
    const finalData = {
      rating,
      review,
      title,
      productId,
    };

    startTransition(() => {
      postReview(finalData).then((data) => {
        if (data?.error) {
          console.log(data?.error);
          toast.error(data?.error);
        }

        if (data?.success) {
          toast.success("Review submitted successfully!");
          reset();
          setOpen(false);
          window.location.reload();
        }
      });
    });
  };

  return (
    <div className="w-full bg-slate-300 p-5">
      <h1 className="text-3xl mb-5">Rating</h1>

      <div className="grid gap-5">
        <Rating
          disabled={isPending}
          emptySymbol={<Star />}
          fullSymbol={<Star fill="black" />}
          initialRating={rating}
          onChange={(rating) => setRating(rating)}
        />
        <div>
          <label>Title</label>
          <Input
            type="text"
            disabled={isPending}
            placeholder="Provide a title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Review</label>
          <Textarea
            type="text"
            disabled={isPending}
            placeholder="Write your comments here"
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <Button disabled={isPending} type="button" onClick={onSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};
