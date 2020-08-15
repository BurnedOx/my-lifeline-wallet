import React from 'react';
import AppLayout from './layout/appLayout';
import ContextProvider from './ContextProvider';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Direct from './containers/Direct/Direct';
import Downline from './containers/Downline/Downline';
import LevelIncome from './containers/LevelIncome/LevelIncome';
import Profile from './containers/Profile/Profile';
import SingleLeg from './containers/SIngleLeg/SingleLeg';
import SingleLegIncome from './containers/SingleLegIncome/SingleLegIncome';
import AccountHistory from './containers/AccountHistory/AccountHistory';
import WithdrawalFund from './containers/WithdrawalFund/WithdrawalFund';
import WithdrawReport from './containers/WithdrawReport/WithdrawReport';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <AppLayout>
          <Route exact path='/' component={Dashboard} />
          <Route path='/profile' component={Profile} />
          <Route path='/direct' component={Direct} />
          <Route path='/downline' component={Downline} />
          <Route path='/single-leg' component={SingleLeg} />
          <Route path='/level-incomes' component={LevelIncome} />
          <Route path='/single-leg-incomes' component={SingleLegIncome} />
          <Route path='/account-history' component={AccountHistory} />
          <Route path='/withdraw' component={WithdrawalFund} />
          <Route path='/withdraw-report' component={WithdrawReport} />
        </AppLayout>
      </Switch>
    </ContextProvider>
  );
}

export default App;
