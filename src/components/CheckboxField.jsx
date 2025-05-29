import React from "react";

const CheckboxField = ({ name, label, checked, onChange }) => {
  return (
    <div
      className="form-group"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label htmlFor={name} style={{ marginRight: "1rem" }}>
        {label}
      </label>
      <label>
        <input
          type="checkbox"
          id={name}
          checked={checked}
          onChange={onChange}
        />
        Ja
      </label>
    </div>
  );
};

export default CheckboxField;
