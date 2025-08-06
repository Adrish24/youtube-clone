import { Link } from "react-router-dom";

const ClickableItem = ({ children, className, path = "#", onClick }) => {
  const baseClass = `hover:bg-base-100 rounded-lg ${className}`;
  return (
    <Link onClick={onClick} to={path} className={baseClass}>
      {children}
    </Link>
  );
};

export default ClickableItem;
