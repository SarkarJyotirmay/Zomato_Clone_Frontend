import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  return (
    <>
      <div className="scape-y-2">
        <div>
          <h2 className="text-2xl font-bold">Menu</h2>
          <FormDescription>Create your menu</FormDescription>
          <FormField
            control={control}
            name="menuItems"
            render={(field) => (
              <FormItem className="flex flex-col gap-2">
                {fields.map((_, idx) => (
                  <MenuItemInput
                    key={idx}
                    idx={idx}
                    removeMenuItem={() => remove(idx)}
                  />
                ))}
              </FormItem>
            )}
          />
          <Button
          type="button"
          className="my-2"
          onClick={()=>append({name: "", proce: ""})}
          >
            Add menu item
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
