import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({ name, label, type = "text", errors }) => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} {...register(name)} />
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;
