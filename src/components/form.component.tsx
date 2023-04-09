// library imports
import Image from "next/image";
import { clsx } from "clsx";
import { FormEvent, useState } from "react";

// asset imports
import MobileBgSlideBar from "../assets/images/bg-sidebar-mobile.svg";

// component imports
import FormHeader from "./form-header.component";
import PersonalInfoFormContent from "./personal-info-form-content.component";
import PlanInfoFormContent from "./plan-info-form-content.component";
import AddOnFormContent from "./add-on-info-form-content.component";

// hooks
import { useMultiStepForm } from "@/hooks/use-multi-step-form.hook";
import { useFormContext } from "@/contexts/form.context";
import { validateFormFields } from "@/utils";
import FinishedFormContent from "./finished-form-content.component";

const steps = [
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
    content: <FinishedFormContent />,
  },
];

function Form() {
  const { currentStep, backStep, nextStep, isFirstStep, isLastStep } =
    useMultiStepForm(steps);

  const { data, setErrors } = useFormContext();

  function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isFormValid = validateFormFields(data, setErrors);
    if (isFormValid) {
      nextStep();
    }
  }

  return (
    <div className="relative flex items-start justify-center h-screen">
      <div className="absolute top-0 w-full ">
        <Image
          priority
          className="w-full"
          aria-hidden
          src={MobileBgSlideBar}
          alt=""
        />
      </div>
      <div className="z-20 flex flex-col items-center justify-center">
        {/* steps */}
        <div className="flex items-center justify-center p-8 space-x-4 text-white bg-transparent">
          {steps.map((step, index) => (
            <span
              key={index}
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
          ))}
        </div>
        {/* step */}
        <div className="w-[240px] mobile:w-[350px] bg-white rounded-lg p-6">
          <FormHeader
            title={currentStep.title}
            description={currentStep.description}
          />
          <form className="pt-2" id={currentStep.id} onSubmit={onSubmitHandler}>
            {currentStep.content && currentStep.content}
          </form>
        </div>
      </div>
      <div
        className={clsx({
          "fixed inset-x-0 bottom-0 z-50 flex items-center justify-between w-full p-4 bg-white":
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
            "p-2 sm:p-4 min-w-[30vw] h-[50px] text-white rounded-md": true,
            "bg-marinBlue": !isLastStep,
            "bg-purplishBlue": isLastStep,
          })}
        >
          {isLastStep ? "Confirm" : "Next Step"}
        </button>
      </div>
    </div>
  );
}

export default Form;
