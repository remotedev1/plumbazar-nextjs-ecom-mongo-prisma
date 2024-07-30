"use client";

import Rating from "react-rating";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Separator } from "../ui/separator";
import { PostReview } from "./post-review";
import { useEffect, useState } from "react";
import {
  calculateRatingPercentages,
  cn,
  convertTimestampToFormattedDate,
} from "@/lib/utils";

const ProductRating = ({ data, reviews }) => {
  const [open, setOpen] = useState(false);
  const [ratingPercentages, setRatingPercentages] = useState({});

  

  useEffect(() => {
    const percentages = calculateRatingPercentages(reviews);
    setRatingPercentages(percentages);
  }, [reviews]);

  return (
    <div className="border p-4 h-max mb-3">
      <h2 className="font-bold text-xl md:text-3xl">Customer Reviews</h2>
      <div className="grid space-x-1 space-y-1 mt-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:pr-5">
            <Rating
              emptySymbol={<Star className="icon" />}
              fullSymbol={<Star className="icon" fill="black" />}
              initialRating={data.globalRating}
              readonly
            />
            <p className="text-sm">Based on {data.numReviews} review</p>
          </div>
          <Separator orientation="vertical" className="hidden md:block" />
          <div className="flex flex-col md:pl-5">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div className="flex items-center space-x-2" key={rating}>
                <Rating
                  emptySymbol={<Star className="icon" />}
                  fullSymbol={<Star className="icon" fill="black" />}
                  initialRating={rating}
                  readonly
                />
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {ratingPercentages[rating] || 0}%{" "}
                  <span className="">{` (${
                    reviews.filter((review) => review.rating === rating)
                      .length || 0
                  })`}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="md:ml-auto">
            <Button
              className="border"
              variant="ghost"
              onClick={() => setOpen(true)}
            >
              Write a review
            </Button>
          </div>
        </div>
        {open && (
          <div
            className={cn(
              "transition-all ease-in duration-75 pt-4",
              open ? "h-auto" : "h-0"
            )}
          >
            {/* <div className="h-0 transition-all ease-in duration-75"> */}
            <PostReview setOpen={setOpen} productId={data.id} />
          </div>
        )}

        <div className="pt-5">
          <Separator />
          <div className="grid mt-2">
            {reviews.length === 0 ? (
              <h2 className="text-xl font-semibold">No reviews</h2>
            ) : (
              reviews.map((data) => (
                <div className="py-5" key={data.id}>
                  <div className="flex gap-2">
                    <span className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <svg
                        className="absolute w-12 h-12 text-gray-400 -left-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <div>
                      <Rating
                        emptySymbol={<Star className="w-4 h-4" />}
                        fullSymbol={<Star className="w-4 h-4" fill="black" />}
                        initialRating={data.rating}
                        readonly
                      />
                      <p>{data.user.name}</p>
                    </div>
                    <p>{convertTimestampToFormattedDate(data.createdAt)}</p>
                  </div>
                  <p className="font-semibold text-lg">{data.title}</p>
                  <p className="text-sm">{data.review}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRating;
