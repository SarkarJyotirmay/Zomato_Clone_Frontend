import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import { setUser, setUserProfile } from "./store/slices/userSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useRef } from "react";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./pages/UserProfile";
import ManageRestaurntPage from "./pages/ManageRestaurntPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const { user, userProfile } = useSelector((state) => state.user);
  const hasFetchedUser = useRef(false);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/auth/stateless-login");
      if (response.data?.user) {
        dispatch(setUser(response.data.user));
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchUserProfile = async () => {
    if (user?.email && !userProfile) {
      try {
        const res = await axiosInstance.get(`/user/user-profile?email=${user.email}`);
        if (res.data.success) {
          dispatch(setUserProfile(res.data.userProfile));
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedUser.current) {
      fetchUser();
      hasFetchedUser.current = true;
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: (
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/user-profile",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-restaurant",
          element: (
            <ProtectedRoute>
              <ManageRestaurntPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/search/:city",
          element: (
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
