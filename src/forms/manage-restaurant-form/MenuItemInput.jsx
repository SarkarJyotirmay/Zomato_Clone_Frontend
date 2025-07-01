import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { IndianRupee } from "lucide-react";
import { Button } from "../../components/ui/button";

const MenuItemInput = ({ idx, removeMenuItem }) => {
  const { control } = useFormContext();
  return (
    <>
      <div className="flex  items-end gap-2">
        <FormField
          control={control}
          name={`menuItems.${idx}.name`}
          render={({field}) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Chiken Sossage Pizza"
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`menuItems.${idx}.price`}
          render={({field}) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price (<IndianRupee />) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="399" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={removeMenuItem}
          className="bg-red-500 max-h-fit"
        >
          Remove
        </Button>
      </div>
    </>
  );
};

export default MenuItemInput;
