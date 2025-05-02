import { useState } from "react";
import { Link } from "react-router-dom";
import ResponseNotification from "./ResponseNotification";

export default function FormPage({
  title,
  fields,
  submitText,
  linkText,
  linkPathText,
  linkPath,
  onSubmit,
  validate,
  apiResponse,
}) {
  const initialForm = fields.reduce((acc, field) => {
    acc[field.name] = {
      value: "",
      validation: {
        isValid: true,
        messages: [],
      },
    };
    return acc;
  }, {});

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: {
        value,
        validation: validate[name](value, form),
      },
    }));
  };

  const isValid = () => {
    return Object.values(form).every((field) => field.validation.isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      const formData = Object.entries(form).reduce((acc, [key, value]) => {
        acc[key] = value.value;
        return acc;
      }, {});
      onSubmit(formData);
    }
  };

  return (
    <main className="relative min-h-screen overflow-y-auto flex items-center justify-center bg-[url('./assets/images/bg4.jpg')] bg-cover bg-center">
      <div className="z-[-1] w-full h-full absolute"></div>

      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-8 min-h-full">
        <div className="bg-white/80 backdrop-blur w-full sm:w-md h-fit flex flex-col justify-center gap-10 p-8 rounded-lg shadow-[0_0_1rem_0_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold">{title}</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            {fields.map((field) => (
              <div key={field.name} className="w-4/5 flex flex-col gap-2">
                <label>{field.label}</label>
                <input
                  className={`input w-full bg-transparent ${
                    form[field.name].value &&
                    (form[field.name].validation.isValid
                      ? "input-success"
                      : "input-error")
                  }`}
                  type={field.type}
                  name={field.name}
                  value={form[field.name].value}
                  onChange={handleChange}
                  required={field.required}
                />
                {form[field.name].validation.messages.map((message) => (
                  <p className="lg:hidden text-red-500 text-sm" key={message}>
                    {message}
                  </p>
                ))}
              </div>
            ))}

            <input
              className="w-4/5 btn btn-neutral btn-soft shadow-none"
              type="submit"
              value={submitText}
            />
            <p className="">
              {linkText}{" "}
              <Link className="hover:link" to={linkPath}>
                {linkPathText}
              </Link>
            </p>
          </form>
        </div>

        <div
          className={`
          absolute top-10 right-10
          bg-white/80 backdrop-blur hidden 
          lg:flex flex-col gap-2 rounded-lg shadow-[0_0_1rem_0_rgba(0,0,0,0.1)]
          transition-all duration-500
          opacity-0 w-80 max-h-[90vh] overflow-y-auto
          scrollbar
          z-10
          ${isValid() ? "" : "p-6 opacity-100"}
        `}
        >
          {Object.keys(form).map(
            (key) =>
              form[key].validation.messages.length > 0 && (
                <div key={key}>
                  <p className="capitalize text-lg font-semibold">
                    {key.replace("_", " ")}
                  </p>
                  <ul className="flex flex-col gap-2 list-disc px-4 py-2">
                    {form[key].validation.messages.map((message) => (
                      <li className="text-red-500 text-sm" key={message}>
                        {message}
                      </li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>
      <ResponseNotification
        apiResponse={apiResponse}
        className="top-20 left-1/2 -translate-x-1/2 transform lg:top-20"
      />
    </main>
  );
}
