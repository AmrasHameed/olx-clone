import React, { useContext, useEffect } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import { AuthContext, FirebaseContext } from './store/Context';
import Header from './Components/Header/Header';
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
      <Post >
        <Header />
        <Outlet />
      </Post>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/create',
        element:<Create/>
      },
      {
        path:'/view',
        element: <ViewPost />
      }
    ]
  },
  {
    path:'/signup',
    element:<Signup />
  },
  {
    path:'/login',
    element: <Login />
  },
])

export default appRouter;