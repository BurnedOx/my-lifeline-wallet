import axios, { AxiosInstance } from 'axios';
import { getUser } from './utils/getUser';
import { RegistrationDTO, User, LoginDTO, Member, Income, SingleLeg, ROI, PasswordDTO, ProfileUpdateDTO, BankDetails, Withdrawal, UserDetails, Transaction } from './interfaces';
import { message } from 'antd';

export default abstract class Api {
    private static instance: AxiosInstance;

    static create() {
        this.instance = axios.create({
            baseURL: process.env.REACT_APP_API_ENDPOINT
        });
        this.instance.interceptors.request.use((request) => {
            const user = getUser();
            if (user) {
                request.headers['x-userid'] = user.id;
                request.headers['Authorization'] = `Bearer ${user.token}`;
            }
            return request;
        });
        this.instance.interceptors.response.use(
            res => res,
            error => {
                const err = error.response?.data ? error.response.data : error;
                message.error(err.message);
                return Promise.reject(err);
            },
        );
    }

    public static get axiosInstance() {
        return this.instance;
    }

    // Accounts Api

    static async register(data: RegistrationDTO): Promise<User> {
        return (await Api.instance.post('/accounts/register', data)).data;
    }

    static async login(data: LoginDTO): Promise<User> {
        return (await Api.instance.post('/accounts/login', data)).data;
    }

    static async getUserDetails(): Promise<UserDetails> {
        return (await Api.instance.get('/accounts/details')).data;
    }

    static async activateAccount(id: string): Promise<User> {
        return (await Api.instance.put('/accounts/activate', { id })).data;
    }

    static async changePassword(data: PasswordDTO) {
        await Api.instance.put('/accounts/password', data);
    }

    static async updateProfile(data: ProfileUpdateDTO) {
        await Api.instance.put('/accounts/profile', data);
    }

    static async updateBankDetails(data: BankDetails) {
        await Api.instance.put('/accounts/bank', data);
    }

    // Members Api

    static async getDirectMembers(): Promise<Member[]> {
        return (await Api.instance.get('/members/direct')).data;
    }

    static async getDownlines(): Promise<Member[]> {
        return (await Api.instance.get('/members/downline')).data;
    }

    static async getSingleLegs(): Promise<SingleLeg[]> {
        return (await Api.instance.get('/members/single-leg')).data;
    }

    // Incomes Api

    static async getLevelIncomes(): Promise<Income[]> {
        return (await Api.instance.get('/income')).data;
    }

    static async getROI(): Promise<ROI[]> {
        return (await Api.instance.get('/rank')).data;
    }

    // Transaction Api

    static async getWithdrals(): Promise<Withdrawal[]> {
        return (await Api.instance.get('/withdrawal')).data;
    }

    static async createWithdrawal(withdrawAmount: number): Promise<Withdrawal> {
        return (await Api.instance.post('/withdrawal', { withdrawAmount })).data;
    }

    static cancelWidrawal(id: string) {
        return Api.instance.put(`/withdrawal/${id}`, { status: 'cancelled' });
    }

    static async getTrxHistory(): Promise<Transaction[]> {
        return (await Api.instance.get('/transaction')).data;
    }
}

Api.create();