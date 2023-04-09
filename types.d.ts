interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
  content: ReactElement;
}

interface Price {
  monthly: string;
  yearly: string;
}

interface Plan {
  title: string;
  price: Price;
  icon: any;
}

interface AddOn {
  id: string;
  title: string;
  description: string;
  price: Price;
}

type FormFieldsData = {
  name: string;
  email: string;
  phone: string;
  plan: Plan;
  yearlyPlan: boolean;
  addOnes: AddOn[];
  errors: {
    name: string;
    email: string;
    phone: string;
  };
};
