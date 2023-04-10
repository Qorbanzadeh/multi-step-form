import { useMultiStepForm } from "@/hooks/use-multi-step-form.hook";
import clsx from "clsx";

function NavigationButton(currentStep: Step) {
  return (
    <>
      <button
        disabled={isFirstStep}
        onClick={backStep}
        className={clsx({
          "text-coolGray cursor-pointer": !isFirstStep,
          "text-transparent": isFirstStep,
        })}
      >
        Go back
      </button>
      <button
        form={currentStep.id}
        type="submit"
        className={clsx({
          "p-2 sm:p-4 w-[25vw] md:w-[12vw] h-[50px] text-white rounded-md text-sm":
            true,
          "bg-marinBlue": !isLastStep,
          "bg-purplishBlue": isLastStep,
        })}
      >
        {isLastStep ? "Confirm" : "Next Step"}
      </button>
    </>
  );
}

export default NavigationButton;
