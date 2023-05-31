import React from "react";
import "./TablePagination.scss";

export default function TablePagination({
  page,
  limit,
  count,
  onChange,
  totalPages,
}) {
  let offsetStart;

  if (page == totalPages) {
    offsetStart = count - limit + 1;
  } else {
    offsetStart = (page - 1) * limit + 1;
  }
  const offsetEnd = offsetStart + limit - 1;

  return (
    <div className="TablePagination">
      <span>
        {offsetStart} - {offsetEnd} of {count}
      </span>
      <button data-page={"first"} onClick={onChange}>
        <svg
          className="nav-icon"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
        </svg>
      </button>
      <button data-page={"prev"} disabled={page == 1} onClick={onChange}>
        <svg className="nav-icon" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path>
        </svg>
      </button>
      <button
        data-page={"next"}
        disabled={page == totalPages}
        onClick={onChange}
      >
        <svg className="nav-icon" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
      </button>
      <button data-page={"last"} onClick={onChange}>
        <svg
          className="nav-icon"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
        </svg>
      </button>
    </div>
  );
}