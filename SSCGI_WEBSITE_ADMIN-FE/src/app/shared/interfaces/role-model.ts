export interface PolicyOption {
<<<<<<< HEAD
    name: string;
    checked: boolean;
    options: {
      Create: boolean;
      Edit: boolean;
      View: boolean;
      Delete: boolean;
      Restore: boolean;
=======
  rolePolicyName: string;
  isChecked: boolean;
    options: {
      canCreate: boolean;
      canEdit: boolean;
      canView: boolean;
      canDelete: boolean;
      canRestore: boolean;
>>>>>>> master
    };
  }
  
  export interface RoleData {
<<<<<<< HEAD
    roleCode: string;  // Updated from 'code'
    roleName: string;
    description: string;
    policies: PolicyOption[];
=======
    roleId:number;
    roleCode: string; 
    roleName: string;
    description: string;
    policies: PolicyOption[];


>>>>>>> master
  }