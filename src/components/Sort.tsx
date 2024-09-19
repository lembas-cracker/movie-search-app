import { useState } from "react";
import "./Sort.css";

interface SortProps {
  onSortChange: (sortBy: string, order: string) => void;
}

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const [sortBy, setSortBy] = useState("popularity");
  const [order, setOrder] = useState("desc");

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    onSortChange(e.target.value, order);
  };

  const handleToggle = () => {
    const newOrder = order === "desc" ? "asc" : "desc";
    setOrder(newOrder);
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="sort">
      <select value={sortBy} onChange={handleSort} className="sort-select">
        <option value="popularity" className="sort-option">
          By Popularity
        </option>
        <option value="release_date" className="sort-option">
          By Release Date
        </option>
        <option value="vote_average" className="sort-option">
          By Rating
        </option>
      </select>
      <button onClick={handleToggle} className="sort-order-btn">
        {order === "desc" ? "↓" : "↑"}
      </button>
    </div>
  );
};
export default Sort;
