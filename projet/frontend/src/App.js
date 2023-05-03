import React from 'react';
import { useState } from "react";
import { ColorModeContext,useMode } from './theme';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './App.css';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/Dashbord";
import Calendar from "./scenes/calender";
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Sidebar from './scenes/global/Sidebar'
import LoginPage from './pages/LoginPage'
import SingupPage from './pages/SingupPage'
import ProfilePage from './pages/ProfilePage'
import App1 from './components/App1';
import Search from './components/Search';
import App2 from './components/PostsViewCy';
import Expertform from './components/Expertformulaire';
import Pie from './scenes/Pie'
import Geo from './scenes/Geography'
import Line from './scenes/line'
import Area from './scenes/area'
import Comment from './scenes/comments'
import PostsCy from './components/Posts_Cy';
function App() {
  const[ theme ,colorMode]= useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="app">
    <AuthProvider>
      <Sidebar  isSidebar={isSidebar}/>
      < main className='content'>
      
      
      <Routes>
              
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
              <Route element = {<App1/>} path="/App1"/>
              <Route element = {<Expertform/>} path="/Expertform"/>
              <Route element = {<App2/>} path="/PostsCy"/>
              <Route element = {< Search/>} path="/Search"/>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/geography" element={<Geo />} />
              <Route path="/line" element={<Line />} />
              <Route path="/Comment" element={<Comment />} />
              <Route path="/area" element={<Area />} />
            </Routes>
            </main>
            </AuthProvider>
      
         
      
        
     
    
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
