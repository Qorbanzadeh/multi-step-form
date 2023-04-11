// library imports
import clsx from "clsx";

// context
import { FormContext } from "../contexts/form.context";
import { inputValidator } from "@/utils";
import { useContext } from "react";

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
  const {
    formData: { fields },
    updateFormData,
  } = useContext(FormContext);
  const { errors } = fields;

  function onBlurHandler(e: React.FocusEvent<HTMLInputElement>) {
    const name = e.target.name as "name" | "email" | "phone";
    const { error, isInputValid } = inputValidator(fields[name], name);
    if (!isInputValid) {
      updateFormData({
        type: "setErrors",
        payload: {
          type: name,
          value: error,
        },
      });
    } else {
      updateFormData({
        type: "setErrors",
        payload: {
          type: name,
          value: "",
        },
      });
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
            value={fields[name]}
            onChange={(e) =>
              updateFormData({
                type: "updateFields",
                payload: { [name]: e.target.value },
              })
            }
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
