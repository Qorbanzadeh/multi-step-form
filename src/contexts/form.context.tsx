import { createContext, useReducer } from "react";

type Action =
  | { type: "next" }
  | { type: "back" }
  | { type: "goTo"; payload: number }
  | { type: "updateFields"; payload: Partial<FormFieldsData> }
  | { type: "setErrors"; payload: { type: string; value: string } };

type State = {
  currentStepIndex: number;
  fields: FormFieldsData;
};

type ContextType = {
  formData: State;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStep: Step;
  updateFormData: React.Dispatch<Action>;
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
    icon: "",
  },
  yearlyPlan: false,
  addOnes: [],
  errors: {
    name: "",
    email: "",
    phone: "",
  },
};

export const FormContext = createContext<ContextType>({
  formData: { currentStepIndex: 0, fields: INITIAL_DATA },
  steps: [],
  isFirstStep: true,
  isLastStep: false,
  updateFormData: () => {},
  currentStep: {
    title: "",
    content: "",
    description: "",
    number: 0,
    id: "",
  },
});

function formReducer(formData: State, action: Action, steps: Step[]): State {
  switch (action.type) {
    case "next":
      return {
        ...formData,
        currentStepIndex:
          formData.currentStepIndex < steps.length - 1
            ? formData.currentStepIndex + 1
            : formData.currentStepIndex,
      };
    case "back":
      return {
        ...formData,
        currentStepIndex:
          formData.currentStepIndex > 0
            ? formData.currentStepIndex - 1
            : formData.currentStepIndex,
      };
    case "goTo":
      return {
        ...formData,
        currentStepIndex: action.payload,
      };
    case "updateFields":
      return {
        ...formData,
        fields: { ...formData.fields, ...action.payload },
      };
    case "setErrors":
      return {
        ...formData,
        fields: {
          ...formData.fields,
          errors: {
            ...formData.fields.errors,
            [action.payload.type]: action.payload.value,
          },
        },
      };
    default:
      return formData;
  }
}

export function FormProvider(props: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const [formData, updateFormData] = useReducer(
    // @ts-ignore
    (state, action) => formReducer(state, action, props.steps),
    {
      currentStepIndex: 0,
      fields: INITIAL_DATA,
    }
  );

  const { steps } = props;
  const isFirstStep = formData.currentStepIndex === 0;
  const isLastStep = formData.currentStepIndex === steps.length - 1;
  const currentStep = steps[formData.currentStepIndex];

  return (
    <FormContext.Provider
      value={{
        formData,
        steps,
        isFirstStep,
        isLastStep,
        updateFormData,
        currentStep,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
