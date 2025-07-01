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

  if (isPending || isCreateLoading || isUpdateLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load restaurant.</div>;

  const isEditing = !!restaurant; // if restaurant already exists user must edit that not create

  return (
    <>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateLoading || isUpdateLoading}
      />
    </>
  );
};

export default ManageRestaurntPage;
