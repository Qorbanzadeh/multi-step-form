// library imports
import Image from "next/image";
import { useState } from "react";

// asset imports
import ArcadeIcon from "../assets/images/icon-arcade.svg";
import AdvancedIcon from "../assets/images/icon-advanced.svg";
import ProIcon from "../assets/images/icon-pro.svg";
import clsx from "clsx";

const plans = [
  {
    title: "Arcade",
    price: "9",
    icon: ArcadeIcon,
  },
  {
    title: "Advanced",
    price: "12",
    icon: AdvancedIcon,
  },
  {
    title: "Pro",
    price: "15",
    icon: ProIcon,
  },
];

function Step2FormContent() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  return (
    <div className="flex flex-col items-center justify-start mt-2">
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={clsx({
              "flex items-start justify-start w-full px-4 py-2 space-x-4 border rounded-lg":
                true,
              " border-lightGray": selectedPlan.title !== plan.title,
              "border-marinBlue bg-marinBlue bg-opacity-5":
                selectedPlan.title === plan.title,
            })}
            onClick={() => setSelectedPlan(plan)}
          >
            <div>
              <Image
                priority
                className="w-[40px] h-auto pt-2"
                aria-hidden
                src={plan.icon}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-marinBlue">{plan.title}</h1>
              <p className="">{plan.price ? `\$${plan.price}/mo` : "Free"}</p>
              {isYearly && (
                <p className="text-xs text-marinBlue">2 months free</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center justify-center w-full mobile:px-8 py-2 mt-4 space-x-4  mobile:font-medium rounded-md bg-alabaster h-[50px]">
        <span className="text-marinBlue">Monthly</span>
        <div
          className="relative inline-block w-[30px] h-[18px] mobile:w-[40px] mobile:h-[24px] rounded-full bg-marinBlue"
          onClick={() => setIsYearly(!isYearly)}
        >
          <div
            className={clsx({
              "inline-block w-[10px] h-[10px] mobile:w-[16px] mobile:h-[16px] transform rounded-full bg-white absolute top-1 left-1 transition-all":
                true,
              "translate-x-full": isYearly,
            })}
          />
        </div>
        <span className="">Yearly</span>
      </label>
    </div>
  );
}

export default Step2FormContent;
