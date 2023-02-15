import { useEffect } from 'react';
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import logo from './logo.svg';
import './App.css';
import "./Style.css"
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  ////notification////////
  async function requestPermission(){
    const permission=await Notification.requestPermission();
    if(permission==='granted'){
      //generate token
      const token=await getToken(messaging,{vapidKey:'BA8Zhozbdu802fEreIjz40ibZZXpb9k-WRMn7K4QITvZ116e2HvHQKfT0qWybKmTTn0PNSb1PLPe0qP2L2JG0Gc'})
      console.log("Token gen",token);
/////////////send this token to server db
    }else if(permission==="denied"){
      alert("you denied for notification")
    }
  }
  useEffect(()=>{ 
    //req the user for notification permission
    requestPermission();
  },[])


  ////////////
  const {currentUser}=useContext(AuthContext)
  const ProtectedRoute=({children})=>{
    if (!currentUser){
      return <Navigate to="/login"/>
    }
    //eza fi user bde yruh al home
    return children
  }
  console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
                <Home/>
            </ProtectedRoute>
          }
          />
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
