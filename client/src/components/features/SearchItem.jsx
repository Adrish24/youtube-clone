import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <li>
      <Link>{item}</Link>
    </li>
  );
};

export default SearchItem;
