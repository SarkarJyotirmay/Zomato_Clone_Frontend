import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Banknote, Clock, Dot, IndianRupee } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SearchResultcard = ({ restaurant }) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group p-4 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>

      <div className="flex flex-col gap-3 justify-between">
        <h3 className="text-2xl font-bold tracking-tight group-hover:underline text-gray-800">
          {restaurant.restaurantName}
        </h3>

        <div id="card-content" className="grid md:grid-cols-2 gap-2 text-sm">
          <div className="flex flex-wrap items-center text-muted-foreground">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex items-center gap-1" key={index}>
                {item}
                {index < restaurant.cuisines.length - 1 && (
                  <Dot className="w-4 h-4 text-gray-400" />
                )}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1 text-gray-700">
            <div className="flex items-center gap-1 text-green-600">
              <Clock />
              {restaurant.deliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from <IndianRupee className="w-4 h-4" />
              {(restaurant.deliveryPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultcard;
