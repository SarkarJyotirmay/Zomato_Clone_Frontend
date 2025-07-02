import React, { useEffect } from "react";
import { DropdownMenu } from "./ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery price",
    value: "deliveryPrice",
  },
  {
    label: "Delivery time",
    value: "deliveryTime",
  },
];

const SortOptionsDropdown = ({ onChange, sortOption }) => {
  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;

  useEffect(() => {
    console.log(selectedSortLabel);
  }, [sortOption]);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <Button variant={"outline"} className="max-w-[200px]">
            Sorted by : {selectedSortLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SortOptionsDropdown;
