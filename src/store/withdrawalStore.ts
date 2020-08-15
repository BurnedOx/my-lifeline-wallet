import { observable, action } from "mobx";
import { Withdrawal } from "../interfaces";
import Api from "../api";

export class WithrawalStore {
    @observable withdrawals: Withdrawal[] = [];

    @action
    async getWithdrawals() {
        const withdrawals = await Api.getWithdrals();
        this.withdrawals = withdrawals;
    }

    @action
    async requestWithdrawal(amount: number) {
        const withdrawal = await Api.createWithdrawal(amount);
        this.withdrawals = [...this.withdrawals, withdrawal];
    }

    @action
    async cancelRequest(id: string) {
        await Api.cancelWidrawal(id);
        const withdrawals = this.withdrawals.filter(w => w.id !== id);
        this.withdrawals = [...withdrawals];
    }

    @action
    clearStore() {
        this.withdrawals = [];
    }
}