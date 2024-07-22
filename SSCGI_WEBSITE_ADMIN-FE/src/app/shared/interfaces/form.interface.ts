interface FormField {
    key: string;
    label: string;
    type: string;
    required?: boolean;
  }
  
  interface FormConfig {
    title: string;
    fields: FormField[];
    policies?: { name: string; options: string[] }[];
  }