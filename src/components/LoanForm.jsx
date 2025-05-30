import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./LoanForm.css";
import "./LoadingAnimation.css";
import InputField from "./InputField";
import CheckboxField from "./CheckboxField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";

// Yup validation schema definition
const validationSchema = yup.object().shape({
  name: yup.string().required("Ange ditt namn"),

  phone: yup
    .string()
    .required("Ange ditt telefonnummer")
    .matches(
      /^(07|\+467)\s*\d{8}$|^0[1-9]\d{5,6}$|^\+46\s*[1-9]\d{5,6}$/, // Validation for swedish phone numbers
      "Ogiltigt telefonnummer. Telefonnumret måste vara svenskt"
    ),

  age: yup
    .number("Din ålder måste vara ett tal")
    .required("Ange din ålder")
    .integer("Ålder måste vara ett heltal")
    .positive("Ålder måste vara ett positivt tal")
    .min(18, "Minimiåldern för att ansöka om lån är 18 år"),

  employed: yup.boolean().nullable(),

  salaryRange: yup.string(),

  loanAmount: yup
    .number("Ange ett giltigt lånebelopp som ett nummer.")
    .integer("Lånebeloppet måste vara ett heltal")
    .positive("Lånebeloppet måste vara positivt")
    .nullable(),

  loanPurpose: yup.string(),

  repaymentYears: yup
    .number("Ange återbetalningstiden i hela år med ett nummer.")
    .integer("Ange ett heltal.")
    .positive("Ange ett positivt tal")
    .max(30, "30 år är vår maximala återbetalningstid")
    .nullable(),

  comments: yup.string(),
});

export default function LoanForm() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { employed: null },
    mode: "onBlur", // Input field validation when the user leaves it
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = methods;

  const [isEmployedYes, setIsEmployedYes] = useState(false);
  const [salaryWarning, setSalaryWarning] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSucces, setSubmissionSucces] = useState(false);
  const localStorageKey = "loanFormData";

  useEffect(() => {
    // Load form data from localStorage om component mount
    const storedData = localStorage.getItem(localStorageKey);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // Set the form values base on the stored data
        Object.keys(parsedData).forEach((key) => {
          if (key === "employed") {
            setIsEmployedYes(parsedData[key] === true);
          } else {
            // Use setValue from useForm to set the values
            setValue(key, parsedData[key]);
          }
        });
      } catch (error) {
        console.error("Couldn't parse data from localStorage: ", error);
        localStorage.removeItem(localStorageKey);
      }
    }
  }, [setValue, localStorageKey]);

  useEffect(() => {
    // Save form data to localStorage whenever form values change
    const saveData = () => {
      const formData = watch();
      formData.employed = isEmployedYes || null;
      localStorage.setItem(localStorageKey, JSON.stringify(formData));
    };

    // Save data on component mount/update
    saveData();

    // Save data before the user leaves the page
    const handleBeforeUnload = () => {
      saveData();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [watch, isEmployedYes, localStorageKey]);

  const handleEmployedYesChange = (event) => {
    setIsEmployedYes(event.target.checked);
    setValue("employed", event.target.checked || null);
  };

  const salaryRangeValue = watch("salaryRange");

  useEffect(() => {
    // Display a warning if the selected salary range is below 20.000 kr
    setSalaryWarning(
      salaryRangeValue === "under-20000"
        ? "Observera att en månadslön under 20.000 kr kan påverka din lånesansökan"
        : ""
    );
  }, [salaryRangeValue]);

  const onSubmit = async (data) => {
    console.log(data); // ** troubleshoot **
    // Handle form submission
    setIsSubmitting(true);
    console.log("Sending loan application...", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setIsSubmitting(false);
    setSubmissionSucces(true);
    localStorage.removeItem(localStorageKey);
    reset({ employed: null }); // Resets the form to its default values
    setIsEmployedYes(false);
  };

  const closeSuccessMessage = () => setSubmissionSucces(false); // Close the succes message modal

  const handleResetForm = () => {
    localStorage.removeItem(localStorageKey);
    reset({ employed: null });
    setIsEmployedYes(false);
  };

  const salaryOptions = [
    { value: "", label: "Välj din månadslöneintervall" },
    { value: "under-20000", label: "Mindre än 20.000 kr" },
    { value: "20000-35000", label: "Mellan 20.000 kr och 35.000 kr" },
    { value: "35000-50000", label: "Mellan 35.000 kr och 50.000 kr" },
    { value: "over-50000", label: "Över 50.000 kr" },
  ];

  return (
    <FormProvider {...methods}>
      <div className="loan-form-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="loan-form"
          noValidate
        >
          <div className="form-header">
            <div className="bank-name">
              <span className="bank-icon" aria-label="Bank">
                💰
              </span>
              <h1>Monopolys banken</h1>
              <span className="bank-icon" aria-label="Bank">
                💰
              </span>
            </div>
            <h2>Låneanasökan</h2>
          </div>

          <InputField name="name" label="Namn" errors={errors} />
          <InputField
            name="phone"
            label="Telefonnummer"
            type="tel"
            errors={errors}
          />
          <InputField name="age" label="Ålder" type="number" errors={errors} />

          <CheckboxField
            name="employed"
            label="Är du anställd?"
            checked={isEmployedYes}
            onChange={handleEmployedYesChange}
          />

          <SelectField
            name="salaryRange"
            label="Din månadslön"
            options={salaryOptions}
            errors={errors}
            warning={salaryWarning}
          />

          <InputField
            name="loanAmount"
            label="Hur mycket vill du låna?"
            type="number"
            errors={errors}
          />
          <InputField
            name="loanPurpose"
            label="Vad är syftet med lånen?"
            errors={errors}
          />
          <InputField
            name="repaymentYears"
            label="Återbetalningstid i år"
            type="number"
            errors={errors}
          />

          <TextAreaField name="comments" label="Kommentarer" errors={errors} />

          <button type="submit" disabled={isSubmitting || submissionSucces}>
            Skicka din låneansökan
          </button>

          <button className="reset-btn" type="button" onClick={handleResetForm}>
            Återställa låneansökningsblanketten
          </button>
        </form>

        {isSubmitting && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="loading-dots">
                <span />
                <span />
                <span />
              </div>
              <p>Skickar din låneansökan</p>
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
              <button onClick={closeSuccessMessage}>Stäng</button>
            </div>
          </div>
        )}
      </div>
    </FormProvider>
  );
}

/* 
** TOFIX **

– Form validation message for input fields: age, loanAmount and repaymentYears. At the moment showing a default message form yup when TypeError
– Checkbox selected state doesn't save in localStorage 

** TODO **
*/
