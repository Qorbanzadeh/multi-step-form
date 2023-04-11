import AddOnFormContent from "@/components/add-on-info-form-content.component";
import ConfirmationFormContent from "@/components/confirmation-form-content.component";
import PersonalInfoFormContent from "@/components/personal-info-form-content.component";
import PlanInfoFormContent from "@/components/plan-info-form-content.component";

export const formSteps: Step[] = [
  {
    name: "step 1",
    id: "your info",
    number: 1,
    title: "Personal info",
    description: "Please provide your name, email, address, and phone number.",
    content: <PersonalInfoFormContent />,
  },
  {
    name: "step 2",
    id: "select plan",
    number: 2,
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    content: <PlanInfoFormContent />,
  },
  {
    name: "step 3",
    id: "add-ons",
    number: 3,
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    content: <AddOnFormContent />,
  },
  {
    name: "step 4",
    id: "summary",
    number: 4,
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    content: <ConfirmationFormContent />,
  },
];
