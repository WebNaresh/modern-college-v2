"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { Button } from "./button";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const ref1 = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }
  const uploadPres = () => {
    console.log(ref1.current?.click());

    // onRemove(value);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div
          key={value}
          className="relative w-[200px] h-[200px] rounded-md overflow-hidden "
        >
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={uploadPres}
              variant={"default"}
              size={"icon"}
            >
              <BiEdit className="h-4 w-4" />
            </Button>
          </div>
          <Image
            className="object-cover rounded-full"
            alt="Image"
            src={value}
            fill
          />
        </div>
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="z7xt7ejq">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              className="hidden"
              ref={ref1}
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={onClick}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
