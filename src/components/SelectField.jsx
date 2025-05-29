import React from "react";
import { useFormContext } from "react-hook-form";

const SelectField = ({ name, label, options, errors, warning }) => {
  const { register } = useFormContext();

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      <select id={name} {...register(name)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
      {warning && <p className="warning">{warning}</p>}
    </div>
  );
};

export default SelectField;
