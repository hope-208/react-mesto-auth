import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authorize } from '../utils/auth.js';
import Header from './Header.js';

const Login = ({ onSignIn }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formValue;
    if (!password || !email) {
      return;
    }
    authorize(formValue.password, formValue.email).then((data) => {
      localStorage.setItem('jwt', data.token);
    });
  };

  return (
    <>
      <Header>
        <div className="header__nav">
          <Link to="/sign-up" className="header__link" replace>
            Регистрация
          </Link>
        </div>
      </Header>
      <div className="auth-form">
        <h1 className="auth-form__title">Вход</h1>
        <form onSubmit={handleSubmit} className="auth-form__form">
          <input
            className="auth-form__form-input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            minLength="5"
            maxLength="64"
            value={formValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="auth-form__form-input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="3"
            maxLength="20"
            value={formValue.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="button-submit-auth">
            Войти
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
