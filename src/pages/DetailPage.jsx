// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGetRestaurantById } from "../api/MyRestaurantApi";
// import { AspectRatio } from "../components/ui/aspect-ratio";
// import RestaurantInfo from "../components/RestaurantInfo";
// import MenuItem from "../components/MenuItem";
// import { Card, CardFooter } from "../components/ui/card";
// import OrderSummary from "../components/OrderSummary";
// import CheckOutButton from "../components/CheckOutButton";
// import { useSelector } from "react-redux";

// const DetailPage = () => {
//   const { id } = useParams(); // id is restaurant id

//   const { restaurant, isPending } = useGetRestaurantById(id);

//   const [cartItems, setCartItems] = useState(() => {
//     const storedCartItems = sessionStorage.getItem(`cartItems-${id}`);
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const { user, userProfile } = useSelector((state) => state.user);

//   useEffect(() => {
//     console.log(cartItems);
//   }, [cartItems]);

//   const addToCart = (menuItem) => {
//     setCartItems((prev) => {
//       // check if item already in cart
//       const existingCartItem = prev.find((item) => item._id === menuItem._id);
//       // if item in cart increase qty  else  add it to cart
//       let updatedCartItems;
//       if (existingCartItem) {
//         updatedCartItems = prev.map((item) =>
//           item._id === menuItem._id
//             ? { ...item, quantity: Number(item.quantity) + 1 }
//             : item
//         );
//       } else {
//         updatedCartItems = [
//           ...prev,
//           {
//             _id: menuItem._id,
//             name: menuItem.name,
//             price: menuItem.price,
//             quantity: 1,
//           },
//         ];
//       }

//       sessionStorage.setItem(
//         `cartItems-${id}`,
//         JSON.stringify(updatedCartItems)
//       );

//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (cartItem) => {
//     setCartItems((prev) => {
//       const updatedCartItems = prev.filter((item) => item._id !== cartItem._id);
//       return updatedCartItems;
//     });
//   };

//   const onCheckout = (userFromData) => {
//     console.log("User profile form data", userProfileForm);
//   };

//   if (isPending || !restaurant)
//     return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 px-4">
//       {/* Header Image */}
//       <div className="max-w-3xl ml-4 ">
//         <AspectRatio
//           ratio={16 / 9}
//           className="rounded-xl overflow-hidden shadow-md"
//         >
//           <img
//             src={restaurant.restaurant.imageUrl}
//             alt={restaurant.restaurant.restaurantName}
//             className="object-cover w-full h-full"
//           />
//         </AspectRatio>
//       </div>

//       {/* Info Section */}
//       <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-[4fr_2fr] gap-8">
//         <div className="flex flex-col gap-4">
//           <RestaurantInfo restaurant={restaurant.restaurant} />

//           {restaurant.restaurant.menuItems.map((item, index) => (
//             <MenuItem
//               menuItem={item}
//               restaurantId={restaurant.restaurant._id}
//               key={index}
//             />
//           ))}
//         </div>
//         {/* Placeholder for future sidebar (e.g., reviews, booking, map, etc.) */}
//         <div className=" bg-white rounded-xl shadow-md p-4">
//           <Card>
//             <OrderSummary
//               restaurant={restaurant.restaurant}
//               cartItems={cartItems}
//               removeFromCart={removeFromCart}
//             />

//             <CardFooter>
//               <CheckOutButton />
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;
import React from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurantById } from "../api/MyRestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "../components/RestaurantInfo";
import MenuItem from "../components/MenuItem";

const DetailPage = () => {
  const { id } = useParams(); // restaurant id
  const { restaurant, isPending } = useGetRestaurantById(id);

  if (isPending || !restaurant)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      {/* Header Image */}
      <div className="max-w-3xl ml-4 ">
        <AspectRatio
          ratio={16 / 9}
          className="rounded-xl overflow-hidden shadow-md"
        >
          <img
            src={restaurant.restaurant.imageUrl}
            alt={restaurant.restaurant.restaurantName}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto mt-8">
        <RestaurantInfo restaurant={restaurant.restaurant} />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {restaurant.restaurant.menuItems.map((item, index) => (
            <MenuItem
              menuItem={item}
              restaurantId={restaurant.restaurant._id}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

