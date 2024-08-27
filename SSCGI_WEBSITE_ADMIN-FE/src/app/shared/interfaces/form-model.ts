export interface FormField {
    key: string;
    label: string;
    type: string;
    required?: boolean;
    selectOptions?: string[];
    fullWidth?: boolean; 
}
  
export interface FormConfig {
    title: string;
    fields: FormField[];
    policies?: { name: string; options: string[] }[];
}