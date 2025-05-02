import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPage from "../components/FormPage";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validate.util";
import { register } from "../utils/users.util";
import { useUserContext } from "../hooks/useUserContext";

export default function Register() {
  const fields = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
    },
    {
      name: "confirm_password",
      label: "Confirm Password",
      type: "password",
      required: true,
    },
  ];

  const validate = {
    first_name: validateName,
    last_name: validateName,
    email: validateEmail,
    password: validatePassword,
    confirm_password: (value, form) =>
      validateConfirmPassword(value, form.password.value),
  };

  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const onRegister = async (formData) => {
    setIsSubmitting(true);
    setApiResponse(null);

    try {
      const { data, message } = await register(formData);

      setApiResponse({
        status: "success",
        message: message || "Registration successful!",
        userData: data,
      });

      setTimeout(() => {
        setUser(data);
        navigate("/");
      }, 2000);
    } catch (error) {
      setApiResponse({
        status: "error",
        message: error.message || "Registration failed",
        isConflict: error.message.includes("already exists"),
      });
      setTimeout(() => setApiResponse(null), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPage
      title="Register"
      fields={fields}
      submitText={isSubmitting ? "Processing..." : "Register"}
      linkText="Already have an account?"
      linkPathText="Signin"
      linkPath="/signin"
      onSubmit={onRegister}
      validate={validate}
      apiResponse={apiResponse}
      isSubmitting={isSubmitting}
    />
  );
}
