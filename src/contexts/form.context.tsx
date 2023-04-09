// library imports
import { createContext, useContext, useState } from "react";

// context
type FormContextProps = {
  data: FormFieldsData;
  updateFields: (fields: Partial<FormFieldsData>) => void;
  setErrors: (type: string, value: string) => void;
  isFormValid: boolean;
};

export const FormContext = createContext<FormContextProps>({
  data: {
    name: "",
    email: "",
    phone: "",
    plan: {
      title: "Arcade",
      price: {
        monthly: "9",
        yearly: "90",
      },
      icon: "ArcadeIcon",
    },
    yearlyPlan: false,
    addOnes: [],
    errors: {
      name: "",
      email: "",
      phone: "",
    },
  },
  updateFields: () => {},
  setErrors: () => {},
  isFormValid: false,
});

export const useFormContext = () => useContext(FormContext);

// provider
type FormProviderProps = {
  children: React.ReactNode;
};

const INITIAL_DATA: FormFieldsData = {
  name: "",
  email: "",
  phone: "",
  plan: {
    title: "Arcade",
    price: {
      monthly: "9",
      yearly: "90",
    },
    icon: "ArcadeIcon",
  },
  yearlyPlan: false,
  addOnes: [],
  errors: {
    name: "",
    email: "",
    phone: "",
  },
};

export const FormProvider = ({ children }: FormProviderProps) => {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormFieldsData>) {
    setData((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  }

  function setErrors(type: string, value: string) {
    setData((prev) => {
      return {
        ...prev,
        errors: {
          ...prev.errors,
          [type]: value,
        },
      };
    });
  }

  const values = {
    data,
    updateFields,
    setErrors,
    isFormValid: Object.values(data.errors).every((value) => value === ""),
  };

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};
