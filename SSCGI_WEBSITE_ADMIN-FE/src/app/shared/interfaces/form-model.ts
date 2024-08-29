export interface FormField {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    selectOptions?: { value: any; label: string }[]; // Type for select options
    filteredOptions?: { value: any, label: string }[];
    fullWidth?: boolean; 
}
  
export interface FormConfig {
    title: string;
    fields: FormField[];
    policies?: { rolePolicyName: string; options: string[] }[];
}