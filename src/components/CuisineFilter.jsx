import React, { useEffect } from "react";
import { cuisineList } from "../config/restaurant-options.config.js";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandClick,
}) => {
  const handleCuisineReset = () => onChange([]);

  const handleCuisineChange = (e) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };

  return (
    <>
      <div className="flex justify-between items-centre px-2">
        <div className="text-mf font-semibold mb-2">Filter by Cuisine</div>
        <div
          onClick={handleCuisineReset}
          className="text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, idx) => {
            const isSelected = selectedCuisines.includes(cuisine);

            return (
              <div className="flex" key={`cuisine_${cuisine}`}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center gap-2 cursor-pointer rounded-full text-sm px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button variant="link" className="mt-4 flex-1" onClick={onExpandClick}>
          {isExpanded ? (
            <span className="flex items-centre text-center gap-2 ">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex items-centre text-center gap-2">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
