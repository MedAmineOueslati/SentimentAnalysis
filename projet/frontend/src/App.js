import React from 'react';
import { useState } from "react";
import { ColorModeContext,useMode } from './theme';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Dashboard from "./scenes/Dashbord";
import Calendar from "./scenes/calender";
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Sidebar from './scenes/global/Sidebar'
import LoginPage from './pages/LoginPage'
import SingupPage from './pages/SingupPage'
import ProfilePage from './pages/ProfilePage'
import App1 from './components/App1';
import App2 from './components/PostsViewCy';
import Pie from './scenes/Pie'
import Geo from './scenes/Geography'
import Line from './scenes/line'
import Area from './scenes/area'
import Comment from './scenes/comments'
import PostsCy from './components/Posts_Cy';
import Expertform from './components/Expertformulaire';
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
      <AuthProvider>
      <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route element = {<LoginPage/>} path="/login"/>
              <Route element = {<SingupPage/>} path="/singup"/>
              <Route element = {<ProfilePage/>} path="/profil"/>
              <Route element = {<App1/>} path="/App1"/>
              <Route element = {<Expertform/>} path="/Expertform"/>
              <Route element = {<App2/>} path="/PostsCy"/>
              <Route path="/pie" element={<Pie />} />
              <Route path="/geography" element={<Geo />} />
              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/Comment" element={<Comment />} />


            </Routes>
            </AuthProvider>
      
         
      
        
     
    </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
