import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

// ! Create a new restaurant
export const useCreateMyRestaurant = () => {
  const createMyRestaurantRequest = async (restaurantFormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `/restaurant/create`,
        restaurantFormData
      );
      if (!response.data.success) {
        throw new Error("Failed to create restaurant");
      }
      return response.data;
    } catch (error) {
      console.warn(
        "Error in creating restaurant from frontend->MyRestaurantApi",
        error
      );
      throw error; // <-- Important for triggering onError
    }
  };

  const { mutate: createRestaurant, isLoading } = useMutation({
    mutationFn: createMyRestaurantRequest,
    onSuccess: () => {
      toast.success("Restaurant created");
    },
    onError: () => {
      toast.error("Unable to create restaurant");
    },
  });

  return { createRestaurant, isLoading };
};

//! Get pre stored restautant
export const useGetMyRestaurant = () => {
  const getMyRestaurant = async () => {
    try {
      const response = await axiosInstance.get(`/restaurant`);
      if (!response.data.success) {
        throw new Error("Failed to get restaurant");
      }
      return response.data;
    } catch (error) {
      console.warn("Error in getting pre stored restaurant:", error);
      throw error; // ✅ Important: so React Query can handle it
    }
  };

  const {
    data: restaurant,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurant,
  });

  return { restaurant, isPending, isError, error };
};

// image not updating
// ! Update restaurant
export const useUpdateMyRestaurant = () => {
  const updateRestaurantRequest = async (restaurantFormData) => {
    const response = await axiosInstance.put(
      `/restaurant/update`,
      restaurantFormData
    );
    return response.data;
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: updateRestaurantRequest,
    onSuccess: () => {
      toast.success("Restaurant updated");
    },
    onError: () => {
      toast.error("Unable to update restaurant");
    },
  });

  return { updateRestaurant, isLoading, isError, error };
};
