import React from 'react';
// import { useNavigate } from 'react-router-dom';
function Login({ onLogin }) {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })
  // const navigate = useNavigate();
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue)
    // navigate('/', { replace: true });
  }
  return (

    < main className='content'>
      <form className='register access' onSubmit={handleSubmit}>
        <h2 className='access__header'>Вход</h2>
        <input className="access__input" placeholder="Email" name={"email"} type="email" minLength={2} maxLength={40} required value={formValue.Email} onChange={handleChange} />
        <input className="access__input" placeholder="Пароль" name={"password"} type="password" minLength={2} maxLength={200} required value={formValue.password} onChange={handleChange} />
        <button className='access__button' type="submit" >Войти</button>
      </form>
    </main>
  );
}

export default Login;
