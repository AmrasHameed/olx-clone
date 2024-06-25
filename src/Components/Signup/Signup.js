import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

export default function Signup() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const { firebase } = useContext(FirebaseContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        setLoading(true); 
        result.user.updateProfile({ displayName: username })
          .then(() => {
            const userRef = firebase.firestore().collection('users').doc(result.user.uid);
            userRef.set({
              id: result.user.uid,
              username: username,
              phone: number
            })
              .then(() => {
                setLoading(false); 
                navigate('/login');
              })
              .catch((error) => {
                setLoading(false); 
                console.error('Error storing user data in Firestore:', error);
                toast.error("An error occurred while storing user data.");
              });
          })
          .catch((error) => {
            setLoading(false); 
            console.error('Error updating profile:', error);
            toast.error('Error updating profile. Please try again.');
          });
      })
      .catch((error) => {
        setLoading(false); 
        console.error('Error creating user:', error);
        const errorCode = error.code;
        let errorMessage = "An error occurred.";

        if (errorCode === 'auth/invalid-email') {
          errorMessage = "Invalid email address.";
        } else if (errorCode === 'auth/email-already-in-use') {
          errorMessage = "Email is already in use. Please use a different email.";
        } else if (errorCode === 'auth/weak-password') {
          errorMessage = "Password is too weak. Use at least 6 characters.";
        }

        toast.error(errorMessage);
      });
  };


  return loading? <Loading /> : (
    <div className="container">
      <div className="signupParentDiv">
        <img alt='img' className="logo" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            required
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            id="phone"
            name="phone"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            required
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
      <ToastContainer/>
    </div>
  );
}
