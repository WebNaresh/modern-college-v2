"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useRef, useState } from "react";
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
      <CldUploadWidget   onUpload={onUpload} uploadPreset="z7xt7ejq">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <>
              <Button
                className="hidden"
                ref={ref1}
                id="UploadButtonId"
                type="button"
                disabled={disabled}
                variant={"secondary"}
                onClick={onClick}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Upload an Image
              </Button>
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
