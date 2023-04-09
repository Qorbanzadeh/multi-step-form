import { useFormContext } from "@/contexts/form.context";
import clsx from "clsx";

const addOns: AddOn[] = [
  {
    id: "online-service",
    title: "Online service",
    description: "Access to multiplayer games",
    price: {
      monthly: "1",
      yearly: "10",
    },
  },
  {
    id: "storage",
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      monthly: "2",
      yearly: "20",
    },
  },
  {
    id: "customizable-profile",
    title: "Customizable profile",
    description: "Custom theme on your profile",
    price: {
      monthly: "3",
      yearly: "30",
    },
  },
];

function AddOnFormContent() {
  // Define state for selected add-ons
  // const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const {
    data: { addOnes, yearlyPlan },
    updateFields,
  } = useFormContext();

  const onChangeHandler = (addOn: AddOn) => {
    if (addOnes.includes(addOn)) {
      const selectedAddOns = addOnes.filter((item) => item !== addOn);
      updateFields({
        addOnes: selectedAddOns,
      });
    } else {
      const selectedAddOns = [...addOnes, addOn];
      updateFields({
        addOnes: selectedAddOns,
      });
    }
  };

  // Render the component
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      {/* Loop through the add-ons and create a div for each one */}
      {addOns.map((addOn) => (
        <div
          // Use `clsx` to conditionally apply classes based on state
          className={clsx({
            "flex items-center w-full p-2 space-x-2 border rounded-md justify-evenly cursor-pointer":
              true,
            "border-purplishBlue bg-purplishBlue bg-opacity-5":
              addOnes.includes(addOn),
          })}
          key={addOn.title}
          // Add an `onClick` handler to toggle selection
          onClick={() => onChangeHandler(addOn)}
        >
          {/* Render a checkbox input for each add-on */}
          <input
            type="checkbox"
            className="rounded-md checked:accent-purplishBlue w-[30px] h-[30px]"
            checked={addOnes.includes(addOn)}
            onChange={() => onChangeHandler(addOn)}
          />
          {/* Render the add-on's title, description, and price */}
          <div className="flex flex-col items-start justify-center w-full">
            <h3 className="text-sm font-medium mobile:text-base text-marinBlue">
              {addOn.title}
            </h3>
            <p className="text-sm">{addOn.description}</p>
          </div>
          <span className="text-sm mobile:text-base text-purplishBlue">
            +$
            {yearlyPlan
              ? `${addOn.price.yearly}/yr`
              : `${addOn.price.monthly}/mo`}
          </span>
        </div>
      ))}
    </div>
  );
}

export default AddOnFormContent;
