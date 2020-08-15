export interface BankDetails {
    accountName: string;
    bankName: string;
    accountNumber: number;
    isfc: string;
    accountType: string;
}

export interface User {
    id: string;
    name: string;
    mobile: number;
    sponsoredBy: Pick<User, 'id' | 'name'> | null;
    epinId: string | null;
    bankDetails: BankDetails | null;
    panNumber: string | null;
    roll: 'user' | 'admin';
    status: 'active' | 'inactive';
    activatedAt: Date | null;
    updatedAt: Date;
    createdAt: Date;
    token: string;
}

export interface UserDetails {
    wallet: number;
    rank: string | null;
    direct: number;
    downline: number;
    singleLeg: number;
    levelIncome: number;
    singleLegIncome: number;
    totalWithdrawal: number;
    totalIncome: number;
}

export interface Member {
    id: string;
    name: string;
    level: number;
    status: 'active' | 'inactive';
    activatedAt: Date | null;
    createdAt: Date;
}

export interface SingleLeg {
    id: string;
    name: string;
    activatedAt: string;
}

export interface Epin {
    id: string;
    owner: Pick<User, 'id' | 'name'> | null;
    updatedAt: Date;
    createdAt: Date;
}

export interface Income {
    id: string,
    ownerId: string,
    from: Pick<User, 'id' | 'name'>,
    level: number,
    amount: number,
    createdAt: Date
}

export interface ROI {
    id: string;
    rank: string;
    income: number;
    updatedAt: Date;
    createdAt: Date;
}

export interface Withdrawal extends BankDetails {
    id: string;
    withdrawAmount: number;
    netAmount: number;
    processedAt: Date | null;
    paymentType: string;
    status: 'paid' | 'unpaid' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export interface Transaction {
    credit?: number;
    debit?: number;
    currentBalance: number;
    remarks: string;
    createdAt: Date;
}

export interface RegistrationDTO {
    name: string;
    mobile: number;
    password: string;
    sponsorId: string;
}

export interface LoginDTO {
    userId: string;
    password: string;
}

export interface PasswordDTO {
    oldPassword: string;
    newPassword: string;
}

export interface ProfileUpdateDTO {
    name?: string;
    mobile?: number;
    panNumber?: string;
}