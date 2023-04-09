// library imports
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

// asset imports
import ArcadeIcon from "../assets/images/icon-arcade.svg";
import AdvancedIcon from "../assets/images/icon-advanced.svg";
import ProIcon from "../assets/images/icon-pro.svg";
import { useFormContext } from "@/contexts/form.context";

const plans: Plan[] = [
  {
    title: "Arcade",
    price: {
      monthly: "9",
      yearly: "90",
    },
    icon: ArcadeIcon,
  },
  {
    title: "Advanced",
    price: {
      monthly: "12",
      yearly: "120",
    },
    icon: AdvancedIcon,
  },
  {
    title: "Pro",
    price: {
      monthly: "15",
      yearly: "150",
    },
    icon: ProIcon,
  },
];

function PlanInfoFormContent() {
  const {
    data: { plan, yearlyPlan },
    updateFields,
  } = useFormContext();

  return (
    <div className="flex flex-col items-center justify-start mt-2">
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        {plans.map((item) => (
          <div
            key={item.title}
            className={clsx({
              "flex items-start justify-start w-full px-4 py-2 space-x-4 border rounded-lg":
                true,
              " border-lightGray": plan.title !== item.title,
              "border-purplishBlue bg-pastelBlue bg-opacity-5":
                plan.title === item.title,
            })}
            onClick={() => updateFields({ plan: item })}
          >
            <div>
              <Image
                priority
                className="w-[40px] h-auto pt-2"
                aria-hidden
                src={item.icon}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-marinBlue">{item.title}</h1>
              <p className="">
                ${yearlyPlan ? item.price.yearly : item.price.monthly}/
                {yearlyPlan ? "yr" : "mo"}
              </p>
              {yearlyPlan && (
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
          onClick={() => updateFields({ yearlyPlan: !yearlyPlan })}
        >
          <div
            className={clsx({
              "inline-block w-[10px] h-[10px] mobile:w-[16px] mobile:h-[16px] transform rounded-full bg-white absolute top-1 left-1 transition-all":
                true,
              "translate-x-full": yearlyPlan,
            })}
          />
        </div>
        <span className="">Yearly</span>
      </label>
    </div>
  );
}

export default PlanInfoFormContent;
