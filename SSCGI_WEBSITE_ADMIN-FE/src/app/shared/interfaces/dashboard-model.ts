export interface DashboardUserAccount {
    expireDate: string; // Date as a string in ISO format
    firstName: string;
    isLocked: boolean | null; // can be a boolean or null
    lastName: string;
    middleName: string;
    personId: string; // Assuming this is a string UUID
    roleId: number; // Assuming roleId is a number
    roleName: string;
    userId: number; // Assuming userId is a number
  }