// library imports
import { useEffect, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

// asset imports
import MobileBgSlideBar from "../assets/images/bg-sidebar-mobile.svg";

// component imports
import FormHeader from "./form-header.component";
import Step1FormContent from "./step-1-form-content.component";
import Step2FormContent from "./step-2-form-content.component";
import { useRouter } from "next/router";
import Link from "next/link";

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
    content: <Step2FormContent />,
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
  const { asPath } = useRouter();

  useEffect(() => {
    const hash = asPath.split("#")[1];
    const currentStep = steps.find((step) => step.id === hash) || steps[0];
    if (hash) setCurrentStep(currentStep);
  }, [asPath]);

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
            <Link
              href={`#${step.id}`}
              key={index}
              className={clsx({
                "cursor-pointer rounded-full w-[30px] h-[30px] grid place-items-center transition-all duration-300 ease-in-out":
                  true,
                "border border-white": currentStep !== step,
                "bg-lightBlue text-marinBlue": currentStep === step,
              })}
            >
              {step.number}
            </Link>
          ))}
        </div>
        {/* step */}
        <div className="w-[240px] mobile:w-[350px] bg-white rounded-lg p-6">
          <FormHeader
            title={currentStep.title}
            description={currentStep.description}
          />
          <form className="pt-2" id={currentStep.id}>
            {currentStep.content && currentStep.content}
          </form>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-end w-full p-4 bg-white">
        <button
          form={currentStep.id}
          type="submit"
          className="p-2 sm:p-4 min-w-[30vw] h-[50px] text-white rounded-md bg-marinBlue"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default Form;
