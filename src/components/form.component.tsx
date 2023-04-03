// library imports
import Image from "next/image";
import { clsx } from "clsx";

// asset imports
import MobileBgSlideBar from "../assets/images/bg-sidebar-mobile.svg";
import { useState } from "react";
import FormHeader from "./form-header.component";
import Step1FormContent from "./step-1-form-content.component";
import { cursorTo } from "readline";

const steps = [
  {
    id: "personal-info",
    number: 1,
    title: "Personal info",
    description: "Please provide your name, email, address, and phone number.",
    content: <Step1FormContent />,
  },
  {
    id: "plan",
    number: 2,
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
  },
  {
    number: 3,
    title: "add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
  {
    id: "finishing-up",
    number: 4,
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
  },
];

function Form() {
  const [currentStep, setCurrentStep] = useState(steps[0]);

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
              onClick={() => setCurrentStep(step)}
              className={clsx({
                "rounded-full w-[30px] h-[30px] grid place-items-center transition-all duration-300 ease-in-out":
                  true,
                "border border-white": currentStep !== step,
                "bg-lightBlue text-marinBlue": currentStep === step,
              })}
            >
              {step.number}
            </span>
          ))}
        </div>
        {/* step */}
        <div className="w-[350px] bg-white rounded-lg p-6">
          <FormHeader
            title={currentStep.title}
            description={currentStep.description}
          />
          <form className="pt-2" id={currentStep.id}>
            {currentStep.content && currentStep.content}
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 flex items-center justify-end w-full p-4 bg-white">
        <button
          form={currentStep.id}
          type="submit"
          className="p-4 text-white rounded-lg bg-marinBlue"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default Form;
