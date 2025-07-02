import React from "react";
import { Link } from "react-router-dom";

const SearchResultInfo = ({ total, city }) => {
  return (
    <div className="text-xl font-semibold flex flex-col gap-4 justify-between lg:items-center lg:flex-row px-4 py-3 bg-white shadow-sm rounded-md border border-gray-200">
      <span className="text-gray-800">
        {total} restaurants found in{" "}
        <span className="text-orange-500 font-bold">{city}</span>
        <Link
          to="/"
          className="ml-2 text-sm font-medium underline text-blue-600 hover:text-blue-800 transition-colors"
        >
          Change Location
        </Link>
      </span>

    </div>
  );
};

export default SearchResultInfo;

