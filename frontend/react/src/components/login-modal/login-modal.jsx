import { useState, useEffect } from "react";
import { useLoginMutation } from "../../store/api";

const LoginModal = ({ opened, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { isSuccess, error }] = useLoginMutation();


  useEffect(() => {
    if (isSuccess) {
      onClose?.()
    }
  }, [isSuccess])

  useEffect(() => {
    if (!!error && 'status' in error && error.data) {
      const { detail } = error.data;
      if (typeof detail === 'string') {
        setErrorMessage(detail);
      } else {
        setErrorMessage('Ошибка авторизации');
      }
    }
  }, [error])

  const handleFormSubmite = (evt) => {
    setErrorMessage('');
    evt.preventDefault();
    const { email, password } = evt.target;

    const formData = {
      email: email.value,
      password: password.value
    }

    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter an email and password');
      return;
    }


    login(formData);
  }

  return (
    <div className={`modal login-modal ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <h2 className="modal__title">Авторизация</h2>
          <form className="login-modal__form" action="#" onSubmit={handleFormSubmite}>
            <input className="custom-input login-modal__input" type="email" name="email" id="login-form-email" placeholder="Эл. почта" required />
            <input className="custom-input login-modal__input" type="password" name="password" id="login-form-password" placeholder="Пароль" required />
            <p className="login-modal__error">{errorMessage}</p>
            <button className="login-modal__button" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;