

const LoginModal = ({ opened, onClose }) => {

  const errorMessage = 'Ошибка: указанного пользователя не существует'

  return (
    <div className={`modal login-modal ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <h2 className="modal__title">Авторизация</h2>
          <form className="login-modal__form" action="#">
            <input className="custom-input login-modal__input" type="email" name="email" id="login-form-email" placeholder="Эл. почта" />
            <input className="custom-input login-modal__input" type="password" name="password" id="login-form-password" placeholder="Пароль" />
            <p className="login-modal__error">{errorMessage}</p>
            <button className="login-modal__button" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginModal;