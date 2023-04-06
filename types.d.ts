interface Plan {
  title: string;
  price: {
    monthly: string;
    yearly: string;
  };
  icon: any;
}

interface AddOn {
  id: string;
  title: string;
  description: string;
  price: string;
}

interface FormsData {
  name?: string;
  email?: string;
  phone?: string;
  plan?: {
    name: "arcade" | "advanced" | "pro";
    type: "monthly" | "yearly";
  };
  addOnes?: AddOn[];
  errors?: {
    name: string;
    email: string;
    phone: string;
  };
}
