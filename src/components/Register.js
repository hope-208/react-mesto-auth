import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.js';
const Register = ({ onSignUp }) => {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
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
    const data = { password: formValue.password, email: formValue.email };
    onSignUp(data);
  };

  return (
    <>
      <Header>
        <div className="header__nav">
          <Link to="/sign-in" className="header__link" replace>
            Войти
          </Link>
        </div>
      </Header>
      <div className="auth-form">
        <h1 className="auth-form__title">Регистрация</h1>
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
            Зарегистрироваться
          </button>
        </form>
        <p className="auth-form__signin">
          Уже зарегистрированы?<span> </span>
          <Link to="sign-in" className="auth-form__login-link" replace>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
