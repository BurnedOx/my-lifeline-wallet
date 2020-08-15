import React from 'react';
import * as Store from './store';
import { getUser } from './utils/getUser';
import AuthStore from './store/AuthStore';
import { MembersStore } from './store/MembersStore';
import { IncomeStore } from './store/IncomeStore';
import { WithrawalStore } from './store/withdrawalStore';
import { TransactionStore } from './store/TransactionStore';

const ContextProvider: React.FC = (props) => {
    const user = getUser();
    const membersStore = new MembersStore();
    const incomeStore = new IncomeStore();
    const withdrawalStore = new WithrawalStore();
    const transactionStore = new TransactionStore();
    const authStore = new AuthStore(user, membersStore, incomeStore, withdrawalStore, transactionStore);

    return (
        <Store.AuthContext.Provider value={authStore}>
            <Store.MembersContext.Provider value={membersStore}>
                <Store.IncomeContext.Provider value={incomeStore}>
                    <Store.WithdrawalContext.Provider value={withdrawalStore}>
                        <Store.TransactionContext.Provider value={transactionStore}>
                            {props.children}
                        </Store.TransactionContext.Provider>
                    </Store.WithdrawalContext.Provider>
                </Store.IncomeContext.Provider>
            </Store.MembersContext.Provider>
        </Store.AuthContext.Provider>
    );
};

export default ContextProvider;