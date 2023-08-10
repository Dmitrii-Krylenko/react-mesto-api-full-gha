import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(formValue)

  }
  return (

    < main className='content'>
      <form className='register access' onSubmit={handleSubmit}>
        <h2 className='access__header'>Регистрация</h2>
        <input className="access__input" placeholder="Email" name={"email"} type="email" minLength={2} maxLength={40} required value={formValue.Email} onChange={handleChange} />
        <input className="access__input" placeholder="Пароль" name={"password"} type="password" minLength={2} maxLength={200} required value={formValue.password} onChange={handleChange} />
        <button className='access__button'>Зарегистрироваться</button>
        {/* <button className='access__link'  >Уже зарегистрированы? Войти</button> */}
        <Link className='access__link' to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>

    </main>


  );
}

export default Register;
