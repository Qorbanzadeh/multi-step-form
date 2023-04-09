import { useFormContext } from "@/contexts/form.context";
import { getTotalPrice } from "@/utils";

function FinishedFormContent() {
  const {
    data: { plan, addOnes, yearlyPlan },
  } = useFormContext();
  const totalPrice = getTotalPrice(plan, yearlyPlan, addOnes);
  return (
    <div>
      {/* prices */}
      <div></div>
      {/* total price */}
      <div className="flex items-center justify-center">
        <span className="text-2xl">Total price: {totalPrice}</span>
      </div>
    </div>
  );
}

export default FinishedFormContent;
