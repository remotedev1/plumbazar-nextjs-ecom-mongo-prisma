"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash } from "lucide-react";

const ImageUpload = ({ disabled, onChange, onRemove, value }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const previews = value.map((image, index) => {
      if (image instanceof Blob) {
        const url = URL.createObjectURL(image);
        return { url, id: index };
      }
      return { url: image, id: image.publicId || index };
    });
    setImagePreviews(previews);

    // Revoke object URLs on cleanup
    return () => {
      previews.forEach((preview) => {
        if (preview.url?.startsWith("blob:")) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [value]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      onChange(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {imagePreviews.map((image, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(image.id)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={image.url} />
          </div>
        ))}
      </div>

      <div>
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          disabled={disabled}
          name="images"
          onChange={handleImageUpload}
          id="image-upload"
        />
        {/* <label htmlFor="image-upload">
          <Button
            type="button"
            disabled={disabled}
            variant="secondary"
            as="span"
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            Upload an Image
          </Button>
        </label> */}
      </div>
    </div>
  );
};

export default ImageUpload;
