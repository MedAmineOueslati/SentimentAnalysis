import React from 'react';
import { useState } from "react";
import { ColorModeContext,useMode } from './theme';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/Dashbord";
import Calendar from "./scenes/calender";
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Sidebar from './scenes/global/Sidebar'
import Profil from"./scenes/Profil"
import Login from "./scenes/Login"
import LoginPage from './pages/LoginPage'
import SingupPage from './pages/SingupPage'
import ProfilePage from './pages/ProfilePage'
function App() {
  const[ theme ,colorMode]= useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="app">
      
      <Sidebar  isSidebar={isSidebar}/>
      < main className='content'>
      <Topbar setIsSidebar={setIsSidebar}/>
      <AuthProvider>
      <Routes>
              <Route path="/" element={<Dashboard />} />
              {/*<Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/faq" element={<FAQ />} />*/}
              <Route path="/calendar" element={<Calendar />} />
              <Route element = {<LoginPage/>} path="/login"/>
              <Route element = {<SingupPage/>} path="/singup"/>
              <Route element = {<ProfilePage/>} path="/profil"/>
      
              
            </Routes>
            </AuthProvider>
      
         
      
        
     
    </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
