// library imports
import clsx from "clsx";

// context
import { useFormContext } from "../contexts/form.context";

interface InputType {
  name: "name" | "email" | "phone";
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
}

const step1Inputs: InputType[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "e.g. Stephen King",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "e.g. stephenking@lorem.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +1 234 567 890",
  },
];

function Step1FormContent() {
  const { formData, formValidate, updateFormData } = useFormContext();
  const { errors } = formData;

  return (
    <>
      {step1Inputs.map(({ name, label }) => (
        <label key={name} className="flex flex-col pt-4">
          <div className="flex items-center justify-between">
            <span className="text-marinBlue">{label}</span>
            {errors?.[name] && (
              <span className="text-xs mobile:text-sm desktop:text-base text-strawberryRed">
                {errors[name]}
              </span>
            )}
          </div>
          <input
            name={name}
            value={formData[name]}
            onChange={(e) => updateFormData({ [name]: e.target.value })}
            onBlur={(e) => {
              formValidate(e.target.value, name);
            }}
            type="text"
            placeholder="e.g. Stephen King"
            className={clsx(
              "p-2 border rounded-m text-marinBlue",
              errors?.[name] && "border-strawberryRed",
              !errors?.[name] && "border-coolGray"
            )}
          />
        </label>
      ))}
    </>
  );
}

export default Step1FormContent;
