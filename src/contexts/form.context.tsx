// library imports
import { createContext, useContext, useState } from "react";

// context
type FormContextProps = {
  formData: FormsData;
  updateFormData: ({ ...data }) => void;
  formValidate: (value: string, type: "name" | "email" | "phone") => void;
};

export const FormContext = createContext<FormContextProps>({
  formData: {},
  updateFormData: () => {},
  formValidate: () => {},
});

export const useFormContext = () => useContext(FormContext);

// provider
type FormProviderProps = {
  children: React.ReactNode;
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormsData>({});

  const updateFormData = ({ ...data }) => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  const formValidate = (value: string, type: "name" | "email" | "phone") => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const prevErrors = formData.errors || {
      name: "",
      email: "",
      phone: "",
    };
    switch (type) {
      case "email":
        if (!value.length) {
          setFormData({
            ...formData,
            errors: {
              ...prevErrors,
              email: "Please enter an email address",
            },
          });
          return false;
        }
        if (!emailRegex.test(String(value).toLowerCase())) {
          setFormData({
            ...formData,
            errors: {
              ...prevErrors,
              email: "Please enter a valid email address",
            },
          });
          return false;
        }
        setFormData({
          ...formData,
          email: "",
        });
        return true;
      case "name":
        if (!value.length) {
          setFormData({
            ...formData,
            errors: {
              ...prevErrors,
              name: "Please enter your name",
            },
          });
          return false;
        }
        setFormData({
          ...formData,
          errors: {
            ...prevErrors,
            name: "",
          },
        });
        return true;
      case "phone":
        if (!value.length) {
          setFormData({
            ...formData,
            errors: {
              ...prevErrors,
              phone: "Please enter a phone number",
            },
          });
          return false;
        }
        setFormData({
          ...formData,
          errors: {
            ...prevErrors,
            phone: "",
          },
        });
        return true;
      default:
        return false;
    }
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, formValidate }}>
      {children}
    </FormContext.Provider>
  );
};
