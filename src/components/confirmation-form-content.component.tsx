// constants
import { formSteps } from "@/constants/form.constant";

// context
import { FormContext } from "@/contexts/form.context";

// utils
import { getTotalPrice } from "@/utils";
import { useContext } from "react";

function ConfirmationFormContent() {
  const {
    updateFormData,
    formData: {
      fields: { plan, yearlyPlan, addOnes },
    },
  } = useContext(FormContext);
  const totalPrice = getTotalPrice(plan, yearlyPlan, addOnes);
  return (
    <div className="md:p-8">
      {/* prices */}
      <div className="flex flex-col items-center justify-center p-4 space-y-4 rounded-md md:p-8 bg-alabaster">
        {/* plan */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-lg font-semibold text-marinBlue">
              {plan.title} ({yearlyPlan ? "Yearly" : "Monthly"})
            </span>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                const index = formSteps.findIndex((step) => step.number === 2);
                updateFormData({
                  type: "goTo",
                  payload: index,
                });
              }}
            >
              change
            </span>
          </div>
          <span className="font-semibold text-marinBlue">
            $
            {yearlyPlan
              ? `${plan.price.yearly}/yr`
              : `${plan.price.monthly}/mo`}
          </span>
        </div>
        {addOnes.length > 1 && (
          <>
            <div className="w-full h-[1px] bg-lightGray my-1"></div>
            <div className="flex flex-col items-center justify-center w-full space-y-4">
              {addOnes.map((addon) => (
                <div
                  className="flex items-center justify-between w-full"
                  key={addon.id}
                >
                  <span className="">{addon.title}</span>
                  <span className="font-semibold text-marinBlue">
                    $+
                    {yearlyPlan
                      ? `${addon.price.yearly}/yr`
                      : `${addon.price.monthly}/mo`}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {/* total price */}
      <div className="flex items-center justify-center p-4 mt-4 md:p-8">
        <span className="flex items-center justify-between w-full">
          <span>Total price</span>
          <span className="text-purplishBlue">
            +${totalPrice}/{yearlyPlan ? "yr" : "mo"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ConfirmationFormContent;
