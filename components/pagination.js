import React from "react";
import _ from "lodash";

const pageList = (current_page, total_page, count = 5) => {
  if (total_page < count) {
    return _.range(1, total_page + 1);
  }
  if (current_page <= Math.ceil(count / 2)) {
    return _.range(1, count + 1);
  }
  if (current_page > total_page - 5) {
    return _.range(total_page + 1 - count, total_page + 1);
  }
  if (current_page - Math.floor(count / 2) > 1) {
    const mid = Math.floor(count / 2);
    return _.range(current_page - mid, current_page - mid + 5);
  }
  return [];
};

const Pagination = ({
  has_next_page,
  has_previous_page,
  current_page,
  next_page,
  previous_page,
  total_pages
}) => (
  <div>
    <div className="center">
      <div className="pagination">
        <a
          disabled={!has_previous_page}
          href={has_previous_page ? `/page/${previous_page}` : null}
        >
          &#8249;
        </a>
        {pageList(current_page, total_pages).map((x, i) => (
          <a
            key={i}
            href={`/page/${i + 1}`}
            className={current_page == i + 1 ? "active" : ""}
          >
            {i + 1}
          </a>
        ))}
        <a
          disabled={!has_next_page}
          href={has_next_page ? `/page/${next_page}` : null}
        >
          &#8250;
        </a>
      </div>
    </div>

    <style jsx>{`
      .center {
        text-align: center;
      }

      .pagination {
        display: inline-block;
        margin: 20px;
      }

      .pagination a {
        color: black;
        float: left;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color 0.3s;
        border: 1px solid #ddd;
        margin: 0 4px;
      }

      .pagination a.active {
        background-color: #4caf50;
        color: white;
        border: 1px solid #4caf50;
      }

      .pagination a:hover:not(.active) {
        background-color: #ddd;
      }
    `}</style>
  </div>
);

export default Pagination;
