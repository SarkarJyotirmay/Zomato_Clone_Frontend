import React from "react";
import { FormControl, FormItem, FormLabel } from "../../components/ui/form";
import {Checkbox} from "../../components/ui/checkbox"

const CuisineCheckbox = ({ cuisine, field }) => {
  return (
    <>
      <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
        <FormControl>
          <Checkbox
            className="bg-white"
            checked={field.value.includes(cuisine)}
            onCheckedChange={(checked) => {
              if (checked) {
                field.onChange([...field.value, cuisine]);
              } else {
                field.onChange(field.value.filter((value) => value != cuisine));
              }
            }}
          />
        </FormControl>
        <FormLabel className="text-xl font-normal">
            {cuisine}
        </FormLabel>
      </FormItem>
    </>
  );
};

export default CuisineCheckbox;
