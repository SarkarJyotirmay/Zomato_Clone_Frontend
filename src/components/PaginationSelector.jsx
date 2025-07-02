import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const PaginationSelector = ({ page, pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(page - 1)}
              />
            </PaginationItem>
          )}

          {pageNumbers.map((number, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(number)}
                isActive={page === number}
                className={`${page === number ? "text-green-600" : ""}`}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page !== pageNumbers.length && (
            <PaginationItem>
              <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default PaginationSelector;
