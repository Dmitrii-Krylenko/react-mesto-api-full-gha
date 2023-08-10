import React from 'react';
import Logo from '../images/header-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function Header({ email = undefined }) {
  const location = useLocation();
  const navigate = useNavigate();
  function signOut() {
    localStorage.removeItem('token');
    navigate('/sign-in')
  }
  function signUp() {
    navigate('/sign-up')
  }
  function signIn() {
    navigate('/sign-in')
  }

  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="логотип" />
      <div className='header__email-button'>
        {location.pathname === '/sign-in' && <button className='header__out' onClick={signUp}>Регистрация</button>}
        {location.pathname === '/sign-up' && <button className='header__out' onClick={signIn}>Войти</button>}
        {location.pathname === '/' && <h2 className='header__button'>{email}</h2>}
        {location.pathname === '/' && <button className='header__out' onClick={signOut}>Выйти</button>}
      </div>
    </header>
  );
}

export default Header;


