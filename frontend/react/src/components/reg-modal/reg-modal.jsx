import { useState, useEffect } from "react";
import { useRegistrationMutation } from "../../store/api";

const RegModal = ({ opened, onClose }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [registration, { isSuccess, error }] = useRegistrationMutation();

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

  useEffect(() => {
    if (isSuccess) {
      onClose?.()
    }
  }, [isSuccess])

  const handleFormSubmite = (evt) => {
    evt.preventDefault();
    setErrorMessage('')
    const { name, email, password, repeatpassword } = evt.target;

    if (password.value !== repeatpassword.value) {
      setErrorMessage('Ошибка: введённые пароли не совпадают');
      return;
    }

    if (!name.value || !email.value || !password.value || !repeatpassword.value) {
      setErrorMessage('Введите все данные');
      return;
    }

    const formData = {
      name: name.value,
      email: email.value,
      password: password.value,
    }

    registration(formData);
  }

  return (
    <div className={`modal reg-moda ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <h2 className="modal__title">Регистрация</h2>
          <form className="reg-modal__form" action="#" onSubmit={handleFormSubmite}>
            <input className="custom-input reg-modal__input" type="text" name="name" id="reg-form-name" placeholder="Имя" required />
            <input className="custom-input reg-modal__input" type="email" name="email" id="reg-form-email" placeholder="Эл. почта" required />
            <input className="custom-input reg-modal__input" type="password" name="password" id="reg-form-password" placeholder="Пароль" required />
            <input className="custom-input reg-modal__input" type="password" name="repeatpassword" id="reg-form-repeat-password" placeholder="Повтор пароля" required />
            <p className="reg-modal__error">{errorMessage}</p>
            <button className="reg-modal__button" type="submit">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegModal;