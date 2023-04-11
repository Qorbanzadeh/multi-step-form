import { createContext, useReducer } from "react";

type Action =
  | { type: "next" }
  | { type: "back" }
  | { type: "goTo"; payload: number };

type State = {
  currentStepIndex: number;
};

type ContextType = {
  state: State;
  steps: Step[];
  isFirstStep: boolean;
  isLastStep: boolean;
  dispatch: React.Dispatch<Action>;
};

export const FormContext = createContext<ContextType>({
  state: { currentStepIndex: 0 },
  steps: [],
  isFirstStep: true,
  isLastStep: false,
  dispatch: () => {},
});

function multiStepFormReducer(
  state: State,
  action: Action,
  steps: Step[]
): State {
  switch (action.type) {
    case "next":
      return {
        currentStepIndex:
          state.currentStepIndex < steps.length - 1
            ? state.currentStepIndex + 1
            : state.currentStepIndex,
      };
    case "back":
      return {
        currentStepIndex:
          state.currentStepIndex > 0
            ? state.currentStepIndex - 1
            : state.currentStepIndex,
      };
    case "goTo":
      return {
        currentStepIndex: action.payload,
      };
    default:
      return state;
  }
}

export function FormProvider(props: {
  steps: Step[];
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(
    // @ts-ignore
    (state, action) => multiStepFormReducer(state, action, steps),
    {
      currentStepIndex: 0,
    }
  );

  const { steps } = props;
  const isFirstStep = state.currentStepIndex === 0;
  const isLastStep = state.currentStepIndex === steps.length - 1;

  return (
    <FormContext.Provider
      value={{ state, steps, isFirstStep, isLastStep, dispatch }}
    >
      {props.children}
    </FormContext.Provider>
  );
}
