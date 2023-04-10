import { useFormContext } from "@/contexts/form.context";
import { getTotalPrice } from "@/utils";

function ConfirmationFormContent() {
  const {
    data: { plan, addOnes, yearlyPlan },
  } = useFormContext();
  const totalPrice = getTotalPrice(plan, yearlyPlan, addOnes);
  return (
    <div>
      {/* prices */}
      <div className="flex flex-col items-center justify-center p-4 rounded-md bg-alabaster">
        {/* plan */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center justify-center">
            <span className="text-lg font-semibold text-marinBlue">
              {plan.title} ({yearlyPlan ? "Yearly" : "Monthly"})
            </span>
            <span className="underline">change</span>
          </div>
          <span className="font-semibold text-marinBlue">
            $
            {yearlyPlan
              ? `${plan.price.yearly}/yr`
              : `${plan.price.monthly}/mo`}
          </span>
        </div>
        {/* divider */}
        <div className="w-full h-[1px] bg-coolGray my-1"></div>
        {/* addons */}
        <div className="flex flex-col items-center justify-center w-full">
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
      </div>
      {/* total price */}
      <div className="flex items-center justify-center my-2">
        <span className="flex items-center justify-between w-full text-lg">
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
