const Modal = ({ children, className, overlay }) => {
  return (
    <div className="fixed inset-0 z-50">
      {overlay ? <div className="absolute inset-0 bg-base-300/50" /> : null}

      <div className={className}>{children}</div>
    </div>
  );
};

export default Modal;
