import { Link } from "react-router-dom";

const Icon = ({ children, className, path = '#' }) => {
  return (
    <Link to={path} className={`hover:bg-base-100 rounded-lg ${className}`}>
      {children}
    </Link>
  );
};

export default Icon;
