// library imports
import clsx from "clsx";

// context
import { useFormContext } from "../contexts/form.context";
import { inputValidator } from "@/utils";

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
    type: "text",
    placeholder: "e.g. stephenking@lorem.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "e.g. +1 234 567 890",
  },
];

function PersonalInfoFormContent() {
  const { data, updateFields, setErrors } = useFormContext();
  const { errors } = data;

  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    const name = e.target.name as "name" | "email" | "phone";
    const { error, isInputValid } = inputValidator(data[name], name);
    if (!isInputValid) {
      setErrors(name, error);
    } else {
      setErrors(name, "");
    }
  }

  return (
    <>
      {step1Inputs.map(({ name, label, placeholder, type }) => (
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
            value={data[name]}
            onChange={(e) => updateFields({ [name]: e.target.value })}
            onBlur={onBlurHandler}
            type={type}
            placeholder={placeholder}
            className={clsx({
              "p-2 border rounded-m text-marinBlue": true,
              "border-strawberryRed": errors?.[name],
              "border-coolGray": !errors?.[name],
            })}
          />
        </label>
      ))}
    </>
  );
}

export default PersonalInfoFormContent;
