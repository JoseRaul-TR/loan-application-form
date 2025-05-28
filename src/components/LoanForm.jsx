import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoanForm.css";
import "./LoadingAnimation.css";

export default function LoanForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const salaryRange = watch("salaryRange");
  const [salaryWarning, setSalaryWarning] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSucces, setSubmissionSucces] = useState(false);

  const localStorageKey = "loanFormData";

  useEffect(() => {
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        Object.keys(parsedData).forEach((key) => {
          setValue(key, parsedData[key]);
        });
      } catch (error) {
        console.error("Couldn't parse data from localStorage: ", error);
        localStorage.removeItem(localStorageKey);
      }
    }
  }, [setValue, localStorageKey]);

  useEffect(() => {
    const saveData = () => {
      const formData = Object.fromEntries(
        Object.keys(watch()).map((key) => [key, watch(key)])
      );
      localStorage.setItem(localStorageKey, JSON.stringify(formData));
    };

    const handleBeforeUnload = () => {
      saveData();
    };

    saveData(); //  Save on component mount/update
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [watch, localStorageKey]);

  useEffect(() => {
    if (salaryRange === "under-20000") {
      setSalaryWarning(
        "Observera att en låg lön kan påverka din lånesansökan."
      );
    } else {
      setSalaryWarning("");
    }
  }, [salaryRange]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log("Sending loan application...", {
      ...data,
      age: parseInt(data.age, 10),
      loanAmount: parseInt(data.loanAmount, 10),
      repaymentYears: parseInt(data.repaymentYears, 10),
    });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3500));

    setIsSubmitting(false);
    setSubmissionSucces(true);
    localStorage.removeItem(localStorageKey);
    reset(); // Resets the form to its default values
  };

  const closeSuccessMessage = () => {
    setSubmissionSucces(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="loan-form">
        <h1>Låneanasökan</h1>

        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Namn krävs." })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefonnummer:</label>
          <input
            type="tel"
            id="phone"
            {...register("phone", { required: "Telefonnummer krävs." })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Ålder:</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "Ålder krävs.",
              valueAsNumber: true,
              min: 18,
            })}
          />
          {errors.age && <p className="error">{errors.age.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="isEmployed">Är du anställd?</label>
          <input type="checkbox" id="isEmployed" {...register("employed")} />
        </div>

        <div className="form-group">
          <label htmlFor="salaryRange">Din månadslön:</label>
          <select id="salaryRange" {...register("salaryRange")}>
            <option value="">Välj din månadslöneintervall:</option>
            <option value="under-20000">Mindre än 20.000 kr</option>
            <option value="20000-35000">Mellan 20.000 kr och 35.000 kr</option>
            <option value="35000-50000">Mellan 35.000 kr och 50.000 kr</option>
            <option value="over-50000">Över 50.000 kr</option>
          </select>
          {salaryWarning && <p className="warning">{salaryWarning}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Hur mycket vill du låna?</label>
          <input
            type="number"
            id="loanAmount"
            {...register("loanAmount", { valueAsNumber: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="loanPurpose">Vad är syftet med lånen?</label>
          <input type="text" id="loanPurpose" {...register("loanPurpose")} />
        </div>

        <div className="form-group">
          <label htmlFor="payLoanPeriod">Återbetalningstid i år:</label>
          <input
            type="number"
            id="repaymentYears"
            {...register("repaymentYears", { valueAsNumber: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comments">Kommentarer:</label>
          <textarea id="comments" {...register("comments")}>
            Skriv dina kommentarer här
          </textarea>
        </div>

        <button type="submit" disabled={isSubmitting || submissionSucces}>
          Skicka din låneansökan
        </button>
      </form>

      {isSubmitting && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="loading-animation">Laddar...</div>
          </div>
        </div>
      )}

      {submissionSucces && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Tack för din låneansökan.
              <br />
              Våra experter kommer att kontakta dig med ett låneerbjudande.
            </p>
            <button onClick={closeSuccessMessage}>Okej</button>
          </div>
        </div>
      )}
    </div>
  );
}
