export interface PolicyOption {
    name: string;
    checked: boolean;
    options: {
      Create: boolean;
      Edit: boolean;
      View: boolean;
      Delete: boolean;
      Restore: boolean;
    };
  }
  
  export interface RoleData {
    roleCode: string;  // Updated from 'code'
    roleName: string;
    description: string;
    policies: PolicyOption[];
  }