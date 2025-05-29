import React from "react";
import { useFormContext } from "react-hook-form";

const TextAreaField = ({ name, label, errors }) => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <textarea id={name} {...register(name)} />
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
    </div>
  );
};

export default TextAreaField;
