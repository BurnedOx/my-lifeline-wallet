import { observable, action } from "mobx";
import { Transaction } from "../interfaces";
import Api from "../api";

export class TransactionStore {
    @observable transactions: Transaction[] = [];

    @action
    async loadTransactions() {
        const trx = await Api.getTrxHistory();
        this.transactions = trx;
    }

    @action
    clearStore() {
        this.transactions = [];
    }
}