import React from "react";
import { useState, useEffect } from "react";

export default function LoanForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [isEmloyed, setIsEmployed] = useState(null);
  const [salaryRange, setSalaryRange] = useState("");
  const [salaryWarning, setSalaryWarning] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [payLoanPeriod, setPayLoanPeriod] = useState("");
  const [comments, setComments] = useState("");

  const [errors, setErrors] = useState({});

  const localStorageKey = "loanFormData";

  useEffect(() => {
    // Load stored data from localStorage on first time
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name || "");
      setPhone(parsedData.phone || "");
      setAge(parsedData.age || "");
      setIsEmployed(parsedData.isEmloyed || null);
      setSalaryRange(parsedData.salaryRange || "");
      setLoanPurpose(parsedData.loanPurpose || "");
      setPayLoanPeriod(parsedData.payLoanPeriod || "");
      setComments(parsedData.comments || "");
    }
  }, [localStorageKey]);

  useEffect(() => {
    // Save data in localStorage when the form is used
    const formData = {
      name,
      phone,
      age,
      isEmloyed,
      salaryRange,
      loanAmount,
      loanPurpose,
      payLoanPeriod,
      comments,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }, [
    name,
    phone,
    age,
    isEmloyed,
    salaryRange,
    loanAmount,
    loanPurpose,
    payLoanPeriod,
    comments,
  ]);

  const handleSalaryChange = (e) => {
    setSalaryRange(e.target.value);
    if (e.target.value === "under-20000") {
        setSalaryWarning("Observera att låg lön kan påverkar din lånesansökan.");
    } else {
        setSalaryWarning("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Namn får inte vara tomt.";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Telefonnummer får inte vara tomt.";
    }
    if (!age.trim()) {
      validationErrors.age = "Ålder får inte vara tomt.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; /* Restart form if there are validation errors */
    }

    const application = {
      name,
      phone,
      age: parseInt(age, 10),
      isEmloyed,
      salaryRange,
      loanAmount: parseInt(loanAmount, 10),
      loanPurpose,
      payLoanPeriod: parseInt(payLoanPeriod, 10),
      comments,
    };
    console.log("Ansökan: ", application);
    alert(
      "Tack för din ansökan! Våra experter kommer att kontakta dig med ett låneerbjudande inom kort."
    );
    localStorage.removeItem(localStorageKey); // Clean localStorage after succesful submit
    // Restore form
    setName("");
    setPhone("");
    setAge("");
    setIsEmployed(false);
    setSalaryRange("");
    setLoanAmount("");
    setLoanPurpose("");
    setPayLoanPeriod("");
    setComments("");
    setErrors({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="loan-form">
        <h1>Låneanasökan</h1>

        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefonnummer:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Ålder:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="isEmployed">Är du anställd?</label>
          <input
            type="checkbox"
            id="isEmployed"
            checked={isEmloyed}
            onChange={(e) => setIsEmployed(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryRange">Din månadslön:</label>
          <select
            id="salaryRange"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
          >
            <option value="">Välj din månadslöneintervall:</option>
            <option value="under-20000">Mindre än 20.000 kr</option>
            <option value="20000-35000">Mellan 20.000 kr och 35.000 kr</option>
            <option value="35000-50000">Mellan 35.000 kr och 50.000 kr</option>
            <option value="over-50000">Över 50.000 kr</option>
          </select>
          {salaryWarning && <p className="warning">{salaryWarning}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Lånebelopp:</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanPurpose">Syftet med lånet:</label>
          <input
            type="text"
            id="loanPurpose"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="payLoanPeriod">Återbetalningstid i år:</label>
          <input
            type="number"
            id="payLoanPeriod"
            value={payLoanPeriod}
            onChange={(e) => setPayLoanPeriod(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Kommentarer:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <button type="submit">Skicka</button>
      </form>
    </div>
  );
}
