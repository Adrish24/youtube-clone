const Icon = ({ children, className }) => {
  return (
    <div className={`py-4 text-xs flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export default Icon;
