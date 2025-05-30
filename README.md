# Monopoly Bank Loan Application

This is a React Vite application for submitting loan applications to Monopoly Bank. It features a user-friendly form with input validation, local storage for saving progress, and a simulated submission process with a loading animation and success message.

## Features

-   **Interactive Loan Application Form:** A multi-field form allowing users to enter their personal details and loan requirements.
-   **Input Validation:** Utilizes `react-hook-form` and `yup` for robust client-side validation, providing clear error messages.
-   **Real-time Updates:** Leverages `react-hook-form`'s `watch` functionality to dynamically react to user input.
-   **Local Storage Persistence:** Automatically saves the form data to the browser's local storage, allowing users to resume their application later.
-   **Employed Toggle:** A custom checkbox component to indicate employment status.
-   **Salary Range Selection:** A dropdown menu to select the user's monthly salary range, with a warning for lower income brackets.
-   **Simulated Submission:** Includes a loading animation during a simulated API call and a success message upon completion.
-   **Custom UI Components:** Includes reusable components for input fields, checkboxes, select dropdowns, and text areas.
-   **Styling:** Styled with CSS modules for a clean and responsive layout.

## Technologies Used

-   [React](https://react.dev/)
-   [Vite](https://vitejs.dev/)
-   [`react-hook-form`](https://react-hook-form.com/) for form management
-   [`yup`](https://github.com/jquense/yup) for schema validation
-   [`@hookform/resolvers`](https://react-hook-form.com/resolvers) for integrating Yup with `react-hook-form`
-   CSS for styling

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn add
    # or
    pnpm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to the address provided (usually `http://localhost:5173`).

## File Structure

.
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CheckboxField.css
│   │   ├── CheckboxField.jsx
│   │   ├── InputField.jsx
│   │   ├── LoanForm.css
│   │   ├── LoanForm.jsx
│   │   ├── LoadingAnimation.css
│   │   ├── SelectField.jsx
│   │   ├── TextAreaField.jsx
│   │   └── index.js
│   ├── main.jsx
│   └── vite-env.d.ts
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js


## Components

-   `LoanForm.jsx`: The main component containing the loan application form.
-   `InputField.jsx`: A reusable component for text and number input fields.
-   `CheckboxField.jsx`: A custom component for the "Are you employed?" toggle.
-   `SelectField.jsx`: A reusable component for dropdown select fields.
-   `TextAreaField.jsx`: A reusable component for multi-line text input.

## To Fix

-   Form validation message for input fields: age, loanAmount and repaymentYears. Currently showing a default message from yup when a TypeError occurs.
-   Checkbox selected state doesn't save correctly in localStorage.

## To Do

*(No specific "TODO" items were listed in the provided code comments.)*

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs or feature requests.

## License

[MIT](LICENSE) (Add your license file if applicable)