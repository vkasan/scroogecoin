import DashboardNav from "../../components/dashboard/dashboard-nav/dashboard-nav.jsx";

const DaashboardCategory = () => {

  return (
    <div className="dashboard">
      <DashboardNav activeItem="category" />
      <div className="dashboard__content">
        <div className="dashboard__wrapper">
          <div className="dashboard-category">
            <div className="dashboard-category__wrapper">
              <ul className="dashboard-category__list category-list">
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-cart.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-car.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-health.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-clothes.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-fun.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <img className="category-list__icon" src="img/category-icons/icon-home.svg" alt="" />
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
                <li className="category-list__item" title="Продукты">
                </li>
              </ul>
              <a className="dashboard-category__button" href="dashboard-category-modal.html">
                Добавить категорию
              </a>
              <button className="dashboard-category__delete-button">
                Удалить категорию
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal category-modal">
        <div className="modal__overlay">
          <div className="modal__content dashboard-modal__content">
            <button className="modal__close-button"></button>
            <form className="dashboard-modal__form">
              <label for="category-name" className="dashboard-modal__text-field">
                <span className="dashboard-modal__text-field-label">Название</span>
                <input className="dashboard-modal__text-field-input" type="text" name="category-name" id="category-name" placeholder="Введите сумму" />
              </label>

              <ul className="category-modal__icons-list category-list">
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
                <li className="category-list__item" title="Продукты">
                  <span className="category-list__icon"></span>
                  <span className="category-list__name">Продукты</span>
                </li>
              </ul>
              <button className="dashboard-modal__submit-button" type="submit">Добавить категорию</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DaashboardCategory;