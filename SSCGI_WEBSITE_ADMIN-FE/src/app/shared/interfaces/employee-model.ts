export interface Employee {
    personId:string;
    address: string;
    contactNumber: string;
    email: string;
    employeeNumber: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    createdByUserId?:any;
}