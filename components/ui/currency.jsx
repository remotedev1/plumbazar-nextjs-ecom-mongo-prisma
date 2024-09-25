"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "INR",
});

const Currency = ({ value ,lineThrough=false}) => {
  //! -------> Preventing hydration error
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // !-------->

  return <span className={cn("inline",lineThrough && "line-through")}>{formatter.format(Number(value))}</span>;
};

export default Currency;
