import React, { Profiler } from 'react';
import './App.css';
import { BrowserRouter,  Routes, Route} from 'react-router-dom'
import { LandingPage } from './website/LandingPage';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { Transaction } from './pages/Transaction';
import { Profile } from './pages/Profile';
import { Notification } from './pages/Notification';
import { Insights } from './pages/Insights';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';

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
             path="/settings"
             element={<Settings />}
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
