const TextareaField = ({
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
    <div>
      <label htmlFor={id} className={`label mb-1 ${styles?.label}`}>
        {label}
      </label>
      <textarea
        id={id}
        type={type}
        title={title}
        maxLength={maxLength}
        minLength={minLength}
        className={`textarea outline-none border-none  ${styles?.textarea}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
      ></textarea>
    </div>
  );
};

export default TextareaField;
