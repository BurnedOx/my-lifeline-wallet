import {createContext} from 'react';
import AuthStore from './AuthStore';
import { MembersStore } from './MembersStore';
import { IncomeStore } from './IncomeStore';
import { WithrawalStore } from './withdrawalStore';
import { TransactionStore } from './TransactionStore';

export const AuthContext = createContext<AuthStore | undefined>(undefined);
export const MembersContext = createContext<MembersStore | undefined>(undefined);
export const IncomeContext = createContext<IncomeStore | undefined>(undefined);
export const WithdrawalContext = createContext<WithrawalStore | undefined>(undefined);
export const TransactionContext = createContext<TransactionStore | undefined>(undefined);