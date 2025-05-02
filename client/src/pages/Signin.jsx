import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormPage from "../components/FormPage";
import { validateEmail, validatePassword } from "../utils/validate.util";
import { login } from "../utils/users.util";
import { useUserContext } from "../hooks/useUserContext";

export default function Signin() {
  const fields = [
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
  ];

  const validate = {
    email: validateEmail,
    password: validatePassword,
  };

  const [apiResponse, setApiResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const onSignin = async (formData) => {
    setIsSubmitting(true);
    setApiResponse(null);

    try {
      const { data, message } = await login(formData);

      setApiResponse({
        status: "success",
        message: message || "Login successful!",
        userData: data,
      });

      setTimeout(() => {
        setUser(data);
      }, 2000);
    } catch (error) {
      setApiResponse({
        status: "error",
        message: error.message || "Login failed",
        isUnauthorized: error.message.includes("Invalid credentials"),
      });
      setTimeout(() => setApiResponse(null), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormPage
      title="Signin"
      fields={fields}
      submitText={isSubmitting ? "Signing in..." : "Signin"}
      linkText="Don't have an account?"
      linkPathText="Register"
      linkPath="/register"
      onSubmit={onSignin}
      validate={validate}
      apiResponse={apiResponse}
    />
  );
}
