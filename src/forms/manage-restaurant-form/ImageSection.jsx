import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "../../components/ui/aspect-ratio";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-bold text-2xl">Image</h2>
        <FormDescription>
          Add an image of your restaurant. Adding a new image will overwrite
          the previous one.
        </FormDescription>
      </div>

      {/* Responsive layout: column on mobile, row on larger screens */}
      <div className="flex flex-col  md:items-start gap-6">
        {existingImageUrl && (
          <div className="w-full md:w-1/2">
            <AspectRatio ratio={16 / 9}>
              <img
                src={existingImageUrl}
                alt="Existing restaurant"
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
        )}

        <div className="w-full md:w-1/2">
          <FormField
            control={control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    className="bg-white"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) =>
                      field.onChange(e.target.files?.[0] || null)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
