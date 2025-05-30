import React from "react";
import "./CheckboxField.css";

const CheckboxField = ({ name, label, checked, onChange }) => {
  return (
    <div
      className="form-group"
      style={{ display: "flex", alignItems: "center" }}
    >
      <label htmlFor={name} style={{ marginRight: "1rem" }}>
        {label}
      </label>
      <div className="toggle-container">
        <input
          type="checkbox"
          id={name}
          className="toggle"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={name} className="toggle-label">
          <span className="toggle-inner" />
          <span className="toggle-switch" />
        </label>
      </div>
    </div>
  );
};

export default CheckboxField;
