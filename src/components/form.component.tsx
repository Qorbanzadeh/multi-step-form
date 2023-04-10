// library imports
import Image from "next/image";
import { clsx } from "clsx";
import { FormEvent, useEffect, useState } from "react";

// asset imports
import MobileBgSlideBar from "../assets/images/bg-sidebar-mobile.svg";
import DesktopBgSlideBar from "../assets/images/bg-sidebar-desktop.svg";

// component imports
import FormHeader from "./form-header.component";
import PersonalInfoFormContent from "./personal-info-form-content.component";
import PlanInfoFormContent from "./plan-info-form-content.component";
import AddOnFormContent from "./add-on-info-form-content.component";

// hooks
import { useMultiStepForm } from "@/hooks/use-multi-step-form.hook";
import { useFormContext } from "@/contexts/form.context";
import { validateFormFields } from "@/utils";
import ConfirmationFormContent from "./confirmation-form-content.component";
import FinishedFormContent from "./Finished-form-content.component";

const steps: Step[] = [
  {
    id: "personal-info",
    number: 1,
    title: "Personal info",
    description: "Please provide your name, email, address, and phone number.",
    content: <PersonalInfoFormContent />,
  },
  {
    id: "plan",
    number: 2,
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    content: <PlanInfoFormContent />,
  },
  {
    id: "add-ons",
    number: 3,
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    content: <AddOnFormContent />,
  },
  {
    id: "finishing-up",
    number: 4,
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    content: <ConfirmationFormContent />,
  },
];

function Form() {
  const { currentStep, backStep, nextStep, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const { data, setErrors } = useFormContext();

  const [isFormFinished, setIsFormFinished] = useState(false);

  function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isFormValid = validateFormFields(data, setErrors);
    if (isFormValid) {
      if (isLastStep) return setIsFormFinished(true);
      // go to next step
      nextStep();
    }
  }

  return (
    <div className="relative flex items-start justify-center w-full h-screen">
      <div className="absolute top-0 md:hidden">
        <Image
          priority
          className="w-full"
          aria-hidden
          src={MobileBgSlideBar}
          alt=""
        />
      </div>
      <div className="z-20 md:w-[60%] flex md:h-[90%] flex-col items-center justify-center overflow-hidden rounded-md md:my-auto md:flex md:flex-row md:bg-white md:p-4">
        <div className="relative flex items-center justify-start md:w-[30%] h-full p-8 space-x-4 text-white bg-transparent md:flex md:flex-col md:space-y-4 md:flex-shrink-0">
          <Image
            priority
            className="absolute flex-shrink-0 hidden object-none rounded-md md:inline-block -z-20"
            aria-hidden
            src={DesktopBgSlideBar}
            alt=""
          />
          {steps.map((step, index) => (
            <div
              className="flex items-center justify-start w-full space-x-2 "
              key={step.id}
            >
              <span
                className={clsx({
                  "rounded-full w-[30px] h-[30px] grid place-items-center transition-all duration-300 ease-in-out":
                    true,
                  "border border-white": currentStep !== step,
                  "bg-lightBlue text-marinBlue cursor-default":
                    currentStep === step,
                })}
              >
                {step.number}
              </span>
              <span className="hidden md:inline-block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="relative w-[240px] mobile:w-[350px] md:w-[70%] bg-white rounded-lg p-6 flex flex-col items-center mobile:items-start justify-start md:h-full">
          {!isFormFinished ? (
            <>
              <FormHeader
                title={currentStep.title}
                description={currentStep.description}
              />
              <form
                className="w-full pt-2"
                id={currentStep.id}
                onSubmit={onSubmitHandler}
              >
                {currentStep.content && currentStep.content}
                <div className="absolute inset-x-0 bottom-0 items-center justify-between hidden w-full p-2 py-4 mb-0 md:flex">
                  <button
                    disabled={isFirstStep}
                    onClick={backStep}
                    type="button"
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
                      "p-2 w-[10vw] h-[50px] text-white rounded-md text-sm":
                        true,
                      "bg-marinBlue": !isLastStep,
                      "bg-purplishBlue": isLastStep,
                    })}
                  >
                    {isLastStep ? "Confirm" : "Next Step"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <FinishedFormContent />
          )}
        </div>
      </div>
      {!isFormFinished && (
        <div
          className={clsx({
            "md:hidden fixed inset-x-0 bottom-0 z-50 flex items-center justify-between w-full p-4 bg-white":
              true,
          })}
        >
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
        </div>
      )}
    </div>
  );
}

export default Form;
