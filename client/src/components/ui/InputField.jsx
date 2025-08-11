const InputField = ({
  children,
  id,
  styles,
  label,
  type,
  title,
  maxLength,
  minLength,
  placeholder,
  value,
  onChange,
  required = true,
  autocomplete,
}) => {
  return (
    <div className={styles?.container}>
      <label htmlFor={id} className={`label mb-1 ${styles?.label}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        title={title}
        maxLength={maxLength}
        minLength={minLength}
        className={`input outline-none border-none  ${styles?.input}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
      />
      {children}
    </div>
  );
};

export default InputField;
