export interface Person {
    personId: string;
    empCode: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    address?: string;
    email: string;
    contactNumber: string;
}

export interface Role {
    roleId: string;
    code?: string;
    name?: string;
    description?: string;
}

export interface UserAccount {
    userAccountId?: string;  
    expireDate: Date;
    person: Person;
    role: Role;
    isAdmin?: boolean;
    isLocked?: boolean;
    requirePasswordChange?: boolean;
    failedAttempt?: number;
}
