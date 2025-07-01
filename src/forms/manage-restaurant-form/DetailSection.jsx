import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useFormContext } from "react-hook-form";
import { IndianRupee } from "lucide-react";

const DetailSection = () => {
  const { control } = useFormContext();
  return (
    <>
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Details</h2>
          <FormDescription>Enter details of your restaurant</FormDescription>
        </div>
        {/* name field */}
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {/* city field */}
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* country field */}
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem  className="flex-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* delivery price field */}
        <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="md:w-[25%]">
              <FormLabel>
                Delivery price (<IndianRupee />)
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="299" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* delivery time field */}
        <FormField
          control={control}
          name="deliveryTime"
          render={({ field }) => (
            <FormItem className="md:w-[25%]">
              <FormLabel>Delivery time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default DetailSection;
