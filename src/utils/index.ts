export function inputValidator(value: string, type: string) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  let isInputValid = true;
  let error = "";
  switch (type) {
    case "email":
      if (!value.length) {
        error = "Please enter an email address";
        isInputValid = false;
      } else if (!emailRegex.test(String(value).toLowerCase())) {
        error = "Please enter a valid email address";
        isInputValid = false;
      }
      break;
    case "name":
      if (!value.length) {
        error = "Please enter your name";
        isInputValid = false;
      }
      break;
    case "phone":
      if (!value.length) {
        error = "Please enter a phone number";
        isInputValid = false;
      }
      break;
    default:
      break;
  }
  return { isInputValid, error };
}

export function validateFormFields(
  data: Partial<FormFieldsData>,
  setError: (name: string, value: string) => void
): boolean {
  let isFormValid = true;

  for (const key in data) {
    // @ts-ignore
    const { error } = inputValidator(data[key], key);
    if (error !== "") {
      setError(key, error);
      isFormValid = false;
    }
  }

  return isFormValid;
}

export const getTotalPrice = (
  plan: Plan,
  yearlyPlan: boolean,
  addOns: AddOn[]
) => {
  let totalPrice = 0;
  if (yearlyPlan) {
    totalPrice += Number(plan.price.yearly);
  } else {
    totalPrice += Number(plan.price.monthly);
  }
  for (const addOn of addOns) {
    if (yearlyPlan) {
      totalPrice += Number(addOn.price.yearly);
    } else {
      totalPrice += Number(addOn.price.monthly);
    }
  }
  return totalPrice;
};
