// library imports
import {
  createContext,
  useContext,
  // useEffect,
  useState,
} from "react";

// context
type FormContextProps = {
  data: FormFieldsData;
  updateFields: (fields: Partial<FormFieldsData>) => void;
  setErrors: (type: string, value: string) => void;
  // saveData: () => void;
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
  // saveData: () => {},
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

  // TODO: add local storage functionality
  // useEffect(() => {
  //   // Load state from storage when the component mounts
  //   const storedState = localStorage.getItem("form-data");
  //   if (storedState) {
  //     setData(JSON.parse(storedState));
  //   }
  // }, []);

  // function saveData() {
  //   localStorage.removeItem("form-data");
  //   localStorage.setItem("form-data", JSON.stringify(data));
  // }

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
    // saveData,
  };

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};
