

const RegModal = ({ opened, onClose }) => {

  const errorMessage = 'Ошибка: введённые пароли не совпадают';

  return (
    <div className={`modal reg-modal ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <h2 className="modal__title">Регистрация</h2>
          <form className="reg-modal__form" action="#">
            <input className="custom-input reg-modal__input" type="text" name="name" id="reg-form-name" placeholder="Имя" />
            <input className="custom-input reg-modal__input" type="email" name="email" id="reg-form-email" placeholder="Эл. почта" />
            <input className="custom-input reg-modal__input" type="password" name="password" id="reg-form-password" placeholder="Пароль" />
            <input className="custom-input reg-modal__input" type="password" name="repeat-password" id="reg-form-repeat-password" placeholder="Повтор пароля" />
            <p className="reg-modal__error">{errorMessage}</p>
            <button className="reg-modal__button" type="submit">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegModal;