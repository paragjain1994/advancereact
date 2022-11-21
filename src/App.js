import React, { useState , useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  
  useEffect(()=>{
    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  
  },[])
  

  const loginHandler = (email, password, clg) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log(email, password, clg);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn',1);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    
      // <AuthContext.Provider value={{isLoggedIn: false}}>
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
      <MainHeader  onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
   
  );
}

export default App;
