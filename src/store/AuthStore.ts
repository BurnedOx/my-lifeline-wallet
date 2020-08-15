import { observable, action } from 'mobx';
import { User, RegistrationDTO, LoginDTO, ProfileUpdateDTO, BankDetails, UserDetails } from '../interfaces';
import Api from '../api';
import { MembersStore } from './MembersStore';
import { IncomeStore } from './IncomeStore';
import { WithrawalStore } from './withdrawalStore';
import { TransactionStore } from './TransactionStore';

export default class AuthStore {
    @observable user: User | null = null;
    @observable details: UserDetails | null = null;

    constructor(
        user: User | null,
        private membersStore: MembersStore,
        private incomeStore: IncomeStore,
        private withdrawalStore: WithrawalStore,
        private transactionStore: TransactionStore,
    ) {
        this.user = user;
    }

    @action
    async register(data: RegistrationDTO) {
        const user = await Api.register(data);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        return user;
    }

    @action
    async login(data: LoginDTO) {
        const user = await Api.login(data);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    @action
    async loadDetails() {
        const details = await Api.getUserDetails();
        this.details = details;
    }

    @action
    async activate(id: string) {
        const user = await Api.activateAccount(id);
        this.user = user;
        return user;
    }

    @action.bound
    async updateProfile(data: ProfileUpdateDTO) {
        if (!this.user) return;
        await Api.updateProfile(data);
        const {name, mobile, panNumber} = data;
        const newUser = {...this.user};
        newUser.name = name ?? this.user.name;
        newUser.mobile = mobile ?? this.user.mobile;
        newUser.panNumber = panNumber ?? null;
        this.user = {...newUser};
        return newUser;
    }

    @action.bound
    async updateBankDetails(data: BankDetails) {
        if (!this.user) return;
        await Api.updateBankDetails(data);
        const newUser = {...this.user};
        newUser.bankDetails = data;
        this.user = {...newUser};
        return newUser;
    }

    @action
    logout() {
        localStorage.removeItem('user');
        this.user = null;
        this.details = null;
        this.membersStore.clearStore();
        this.incomeStore.clearStore();
        this.withdrawalStore.clearStore();
        this.transactionStore.clearStore();
    }
}