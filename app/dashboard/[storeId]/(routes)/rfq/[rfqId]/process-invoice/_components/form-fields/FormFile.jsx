"use client";

import { ChangeEvent, useRef, useState } from "react";

// RHF
import { useFormContext, useWatch } from "react-hook-form";

// ShadCn components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";


// Icons
import { ImageMinus, Image } from "lucide-react";
// Components
import BaseButton from "../BaseButton";

const FormFile = ({ name, label, placeholder }) => {
  const { control, setValue } = useFormContext();

  const logoImage = useWatch({
    name: name,
    control,
  });

  const [base64Image, setBase64Image] = useState  (logoImage ?? "");
  const fileInputRef = (useRef (null));

  const handleFileChange = (e) => {
    const files = e.target?.files;
    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result;
        if (base64String) {
          setBase64Image(base64String);
          setValue(name, base64String); // Set the value for form submission
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setBase64Image("");
    setValue(name, "");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <Label>{label}:</Label>
            {base64Image ? (
              // TODO
              // <img
              //   id="logoImage"
              //   src={base64Image}
              //   style={{
              //     objectFit: "contain",
              //     width: "10rem",
              //     height: "7rem",
              //   }}
              // />
              <></>
            ) : (
              <div
                style={{
                  objectFit: "contain",
                  width: "10rem",
                  height: "7rem",
                }}
              >
                <Label
                  htmlFor={name}
                  className="flex justify-center items-center h-[7rem] w-[10rem] cursor-pointer rounded-md bg-gray-100 dark:bg-slate-800 border border-black dark:border-white hover:border-blue-500"
                >
                  <>
                    <div className="flex flex-col items-center">
                      {/* <Image /> */}
                      <p>{placeholder}</p>
                    </div>
                    <FormControl>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id={name}
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </FormControl>
                    <FormMessage />
                  </>
                </Label>
              </div>
            )}
          </FormItem>
        )}
      />
      {base64Image && (
        <div>
          <BaseButton variant="destructive" onClick={removeLogo}>
            <ImageMinus />
            Remove logo
          </BaseButton>
        </div>
      )}
    </>
  );
};

export default FormFile;
