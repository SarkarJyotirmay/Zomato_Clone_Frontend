import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/MyRestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultcard from "../components/SearchResultcard";
import SearchBar from "../components/SearchBar";
import PaginationSelector from "../components/PaginationSelector";
import CuisineFilter from "../components/CuisineFilter";
import { set } from "react-hook-form";
import SortOptionsDropdown from "../components/SortOptionsDropdown";

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const { results, isPending } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption) => {
    setSearchState((prev) => ({ ...prev, sortOption, page: 1 }));
  };

  const setSelectedCuisines = (selectedCuisines) => {
    setSearchState((prev) => ({ ...prev, selectedCuisines, page: 1 }));
  };

  const setPage = (page) => {
    setSearchState((prev) => ({ ...prev, page }));
  };

  const setSearchQuery = (searchFormData) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchQuery({ searchQuery: "" });
  };

  if (isPending)
    return (
      <div className="text-center py-10 text-gray-500 text-lg animate-pulse">
        Loading...
      </div>
    );

  if (!results?.data || !city)
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        No results found for <span className="text-orange-500">{city}</span>
      </div>
    );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
      <p className="text-gray-600 text-base">
        User searched for:{" "}
        <span className="font-semibold text-orange-500">{city}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Left Sidebar -> cuisine fileter */}
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 h-fit">
          <div className="">
            <CuisineFilter
              selectedCuisines={searchState.selectedCuisines}
              onChange={setSelectedCuisines}
              isExpanded={isExpanded}
              onExpandClick={() => setIsExpanded((prev) => !prev)}
            />
          </div>
        </div>

        {/* Main Content */}
        <div id="main-content" className="flex flex-col gap-5">
          <SearchBar
            onSubmit={setSearchQuery}
            placeHolder={"Search by cuisine or restaurant name"}
            onReset={resetSearch}
          />

          <div className="flex flex-col lg:flex-row gap-2 justify-between ">
            <SearchResultInfo total={results.pagination.total} city={city} />

          {/* sort option dropdpown */}
          <SortOptionsDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
          </div>

          {results.data.map((restaurant) => (
            <SearchResultcard restaurant={restaurant} key={restaurant._id} />
          ))}

          <PaginationSelector
            page={results.pagination.page}
            pages={results.pagination.pages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
