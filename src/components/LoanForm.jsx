import React from "react";
import { useState, useEffect } from "react";
import "./LoanForm.css";
import { useFormState } from "react-dom";

export default function LoanForm() {

  // State variables for every form input
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [employed, setEmployed] = useState(false);
  const [salaryRange, setSalaryRange] = useState("");
  const [salaryWarning, setSalaryWarning] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [repaymentYears, setRepaymentYears] = useState("");
  const [comments, setComments] = useState("");

  // State variable for form validation errors
  const [errors, setErrors] = useState({});

  // Key for localStorage
  const localStorageKey = "loanFormData";

  // useEffect to load data from localStorage when component is rendered
  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setName(parsedData.name || "");
        setPhone(parsedData.phone || "");
        setAge(parsedData.age || "");
        // Check if isEmployed is null/undefined and sets it to false if that it's the case
        setEmployed(parsedData.emloyed === true);
        setSalaryRange(parsedData.salaryRange || "");
        setLoanAmount(parsedData.loanAmount || "");
        setLoanPurpose(parsedData.loanPurpose || "");
        setRepaymentYears(parsedData.repaymentYears || "");
        setComments(parsedData.comments || "");
      } catch (e) {
        console.error("Kunde inte parsa data från localStorage:", e);
        localStorage.removeItem(localStorageKey); // Remove corrupt data from localStorage
      }
    }
  }, [localStorageKey]);

  // useEffect fo save data into localStorage with every change in any form inputfield
  useEffect(() => {
    // Fuction to save data in localStorage
    const saveData = () => {
      const formData = {
        name,
        phone,
        age,
        employed,
        salaryRange,
        loanAmount,
        loanPurpose,
        repaymentYears,
        comments,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(formData));
    };

    // Save data immediately on every state change
    saveData();

    // Add a event listener to save data before the app is reloaded/closed
    const handleBeforeUnload = () => {
      saveData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean-up function to clean event listener when the component is dismounted
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [
    name,
    phone,
    age,
    employed,
    salaryRange,
    loanAmount,
    loanPurpose,
    repaymentYears,
    comments,
    // * TOCHECK * Inkludera localStorageKey i beroendelistan om den ändras dynamiskt (vilket den inte gör här)
    // men det är bra att vara konsekvent om den skulle vara en prop eller state.
  ])

  // Handle changes in salaryRange dropdown
  const handleSalaryChange = (e) => {
    setSalaryRange(e.target.value);
    if (e.target.value === 'under-20000') {
      setSalaryWarning("Observera att en låg lön kan påverka din låneansökan negativt.")
    } else {
      setSalaryWarning("");
    }
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent standard behaviour that reloads the app
    const validationErrors = {};

    // Validation for mandatory inputs
    if (!name.trim()) {
      validationErrors.name = "Namn krävs.";
    }
    if (!phone.trim()) {
      validationErrors.phone = "Telefonnummer krävs."
    }
    if (!age.trim()) {
      validationErrors.age = "Ålder krävs.";
    }

    setErrors(validationErrors); // Update error messages

    // If there are any validation errors, cancel submit 
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Create an object with the application data
    const application = {
      name,
      phone,
      age: parseInt(age, 10), // Convert age to integer
      employed,
      salaryRange,
      loanAmount: parseInt(loanAmount, 10), // Convert loanAmount to integer
      loanPurpose,
      repaymentYears: parseInt(repaymentYears, 10), // Convert repaymentYears to integer
      comments,
    };

    console.log("Ansökan: ", application); // Display the aplication in the console

    // Show a confirmation message
    alert(
      "Tack för din ansökan! Våra experter kommer att kontakta dig med ett låneerbjudande."
    );

    // Clean localStorage after succesful submit
    localStorage.removeItem(localStorageKey);

    // Reset the form inputfields to their initial values
    setName("");
    setPhone("");
    setAge("");
    setEmployed(false);
    setSalaryRange("");
    setLoanAmount("");
    setLoanPurpose("");
    setRepaymentYears("");
    setComments("");
    setErrors({}); // Cleans possible error messages
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
            checked={employed}
            onChange={(e) => setEmployed(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryRange">Din månadslön:</label>
          <select
            id="salaryRange"
            value={salaryRange}
            onChange={handleSalaryChange}
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
            id="repaymentYears"
            value={repaymentYears}
            onChange={(e) => setRepaymentYears(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Kommentarer:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          >
            Skriv dina kommentarer här
          </textarea>
        </div>

        <button type="submit">Skicka</button>
      </form>
    </div>
  );
}
