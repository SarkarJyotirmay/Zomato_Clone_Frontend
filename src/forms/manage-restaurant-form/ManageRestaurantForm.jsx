import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton";
import { data } from "react-router-dom";

const formShema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    state: z.string({
      required_error: "state is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a type number",
    }),
    deliveryTime: z.coerce.number({
      required_error: "delivery time price is required",
      invalid_type_error: "must be a type number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select atleast one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
  });

const ManageRestaurantForm = ({ restaurant, onSave, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formShema),
    defaultValues: {
      restaurantName: "",
      city: "",
      state: "",
      deliveryPrice: 0,
      deliveryTime: 0,
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
      imageUrl: "",
      imageFile: null,
    },
  });

  // to pre populate form
  useEffect(() => {
    console.log("restaurant:", restaurant);
    console.log("restaurant.menuItems:", restaurant?.restaurant.menuItems);
    console.log("type of menuItems:", typeof restaurant?.restaurant.menuItems);
    console.log("isArray:", Array.isArray(restaurant?.restaurant.menuItems));

    if (!restaurant || !restaurant.restaurant.menuItems) {
      return;
    }
    // price lowest domination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt(
      (restaurant.restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
    }));

    const updatedRestaurant = {
      ...restaurant.restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson) => {
    //  convert formdata json to form data object
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("state", formDataJson.state);
    // converting to paisa and send to backend
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );

    formData.append("deliveryTime", formDataJson.deliveryTime.toString());
    formDataJson.cuisines.forEach((cuisine, idx) => {
      formData.append(`cuisines[${idx}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, idx) => {
      formData.append(`menuItems[${idx}][name]`, menuItem.name);
      formData.append(
        `menuItems[${idx}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    // formData.append("imageFile", formDataJson.imageFile)
    // if (formDataJson.imageFile instanceof File) {
    //   formData.append("imageFile", formDataJson.imageFile);
    // } else {
    //   console.error("Invalid or missing imageFile:", formDataJson.imageFile);
    // }
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-200 p-10 rounded-lg w-[90%] m-auto my-6 "
        >
          <DetailSection />
          <Separator className="h-px bg-gray-400" />
          <CuisinesSection />
          <Separator className="h-px bg-gray-400" />
          <MenuSection />
          <Separator className="h-px bg-gray-400" />
          <ImageSection />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default ManageRestaurantForm;
