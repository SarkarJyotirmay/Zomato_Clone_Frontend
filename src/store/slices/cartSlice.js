import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

// Thunks
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/cart");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fetch cart failed"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ restaurantId, menuItemId }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/cart/add", {
        restaurantId,
        menuItemId,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (menuItemId, thunkAPI) => {
    try {
      const res = await axiosInstance.delete("/cart/remove", {
        data: { menuItemId },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Remove item failed"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ menuItemId, quantity }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch("/cart/update", {
        menuItemId,
        quantity,
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update quantity failed"
      );
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.delete("/cart/clear");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Clear cart failed"
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    restaurantId: null,
    restaurantName: "",
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCartState: (state) => {
      state.restaurantId = null;
      state.restaurantName = "";
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload) {
          state.restaurantId = action.payload.restaurantId;
          state.restaurantName = action.payload.restaurantName;
          state.items = action.payload.items;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ADD to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.restaurantId = action.payload.restaurantId;
        state.restaurantName = action.payload.restaurantName;
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // REMOVE from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // UPDATE quantity
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.error = null;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // CLEAR cart
      .addCase(clearCart.fulfilled, (state) => {
        state.restaurantId = null;
        state.restaurantName = "";
        state.items = [];
        state.error = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
