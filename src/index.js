import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import appRouter from './App';
import Context, { FirebaseContext } from './store/Context';
import firebase from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{firebase}}>
      <Context>
        <RouterProvider router={appRouter} />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>
);
