import React, { Profiler } from 'react';
import './App.css';
import { BrowserRouter,  Routes, Route} from 'react-router-dom'
import { LandingPage } from './website/LandingPage';
import { Signup } from './account/admin/Signup';
import { Login } from './account/admin/Login';
import { Dashboard } from './account/admin/Dashboard';
import { ForgotPassword } from './account/admin/ForgotPassword';
import { Account } from './account/admin/Account';
import { Transaction } from './account/admin/Transaction';
import { Profile } from './account/Profile';
import { Notification } from './account/admin/Notification';
import { Insights } from './account/admin/Insights';
import { Help } from './account/admin/Help';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route 
             path="/"
             element={<LandingPage />}
            />
            <Route 
             path="/signup"
             element={<Signup />}
            />
            <Route 
             path="/login"
             element={<Login />}
            />
            <Route 
             path="/dashboard"
             element={<Dashboard />}
            />
            <Route 
             path="/forgot-password"
             element={<ForgotPassword />}
            />
            <Route 
             path="/my-account"
             element={<Account />}
            />
            <Route 
             path="/my-transactions"
             element={<Transaction />}
            />
            <Route 
             path="/my-profile"
             element={<Profile />}
            />
            <Route 
             path="/notifications"
             element={<Notification />}
            />
            <Route 
             path="/insights"
             element={<Insights />}
            />
            <Route 
             path="/help"
             element={<Help />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
