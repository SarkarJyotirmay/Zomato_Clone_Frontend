import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// ✅ Define schema correctly with a .min rule to prevent empty strings
const formSchema = z.object({
  searchQuery: z.string().min(1, { message: "Restaurant name is required" }),
});

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery ?? "", // ✅ Always define defaultValues to avoid uncontrolled input warnings coming from prop
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset(); // ✅ No need to explicitly set value if default is already ""
    onReset?.(); // ✅ Shorter optional chaining for cleanliness
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          onSubmit?.(data);
        })}
        className={`flex flex-wrap md:flex-nowrap items-center gap-3 border-2 rounded-full p-2 mx-2 ${
          form.formState.errors.searchQuery
            ? "border-red-500"
            : "border-gray-500"
        } w-full max-w-4xl mx-auto`} // Added max width and center
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />

        {/* Wrapper to let input expand */}
        <div className="flex-1">
          <FormField
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeHolder}
                    className="w-full border-none shadow-none text-xl focus-visible:ring-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Buttons grouped with spacing */}
        <div className="flex flex-wrap md:flex-nowrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            type="submit"
            className="rounded-full bg-orange-500 text-white"
          >
            Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
