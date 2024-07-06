"use client";

import PreviewModal from "@/components/frontend/preview-modal";
import { useEffect, useState } from "react";

export const PreviewProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // we are in server side meaning we are not rendering any modal on server side
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
    </>
  );
};
