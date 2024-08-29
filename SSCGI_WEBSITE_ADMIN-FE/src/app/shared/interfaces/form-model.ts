export interface FormField {
    key: string;
    label: string;
    type: string;
    required?: boolean;
<<<<<<< HEAD
    selectOptions?: string[];
=======
    selectOptions?: { value: any; label: string }[]; // Type for select options
    filteredOptions?: { value: any, label: string }[];
>>>>>>> master
    fullWidth?: boolean; 
}
  
export interface FormConfig {
    title: string;
    fields: FormField[];
<<<<<<< HEAD
    policies?: { name: string; options: string[] }[];
=======
    policies?: { rolePolicyName: string; options: string[] }[];
>>>>>>> master
}