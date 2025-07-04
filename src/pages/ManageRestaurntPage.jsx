import React from "react";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "../api/MyRestaurantApi";

const ManageRestaurntPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { restaurant, isPending, isError } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  if (isError || !restaurant) {
    // No restaurant found, show form for creating a new one
    return (
      <ManageRestaurantForm
        restaurant={null}
        onSave={createRestaurant}
        isLoading={isCreateLoading}
      />
    );
  }

  if (isPending || isCreateLoading || isUpdateLoading)
    return <div>Loading...</div>;

  const isEditing = !!restaurant; // if restaurant already exists user must edit that not create

  return (
    <>
      <ManageRestaurantForm
        restaurant={restaurant.restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </>
  );
};

export default ManageRestaurntPage;
