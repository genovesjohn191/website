export interface PolicyOption {
  rolePolicyName: string;
  isChecked: boolean;
    options: {
      canCreate: boolean;
      canEdit: boolean;
      canView: boolean;
      canDelete: boolean;
      canRestore: boolean;
    };
  }
  
  export interface RoleData {
    roleId:number;
    roleCode: string; 
    roleName: string;
    description: string;
    policies: PolicyOption[];


  }