import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <Link to={user?'/':'/login'}><span>{user ? user.displayName : 'Login'}</span></Link>
          <hr />
        </div>
          {user && <span className='logout' onClick={()=>{
            firebase.auth().signOut();
            navigate('/login')
          }}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
            <Link to={user?'/create':'/login'}>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
