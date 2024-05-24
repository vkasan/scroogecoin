
import DashboardNav from "../../components/dashboard/dashboard-nav/dashboard-nav.jsx";

const DashboardBudget = () => {

  return (
    <div className="dashboard">
      <DashboardNav activeItem="budget" />
      <div className="dashboard__content">
        <div className="dashboard__wrapper">
          <div className="dashboard-budget">
            <div className="dashboard-budget__wrapper">
              <p className="dashboard-budget__total-amount">150 000</p>
              <div className="dashboard-budget__controls">
                <a className="dashboard-budget__controls-button" href="dashboard-budget-incom-modal.html">
                  Добавить доход
                </a>
                <a className="dashboard-budget__controls-button dashboard-budget__controls-button--orange" href="dashboard-budget-expenses-modal.html">
                  Добавить расходы
                </a>
              </div>

              <div className="dashboard-budget__histoy">
                <ul className="dashboard-budget__history-list">
                  <li className="dashboard-budget__history-item">
                    <span className="dashboard-budget__history-icon"></span>
                    <p className="dashboard-budget__history__name">
                      Стипендия
                    </p>
                    <p className="dashboard-budget__history-amount">
                      +5600 P
                    </p>
                  </li>
                  <li className="dashboard-budget__history-item">
                    <img className="dashboard-budget__history-icon" src="img/category-icons/icon-cart.svg" alt="" />
                    <p className="dashboard-budget__history__name">
                      Продукты
                    </p>
                    <p className="dashboard-budget__history-amount">
                      -430 P
                    </p>
                  </li>
                  <li className="dashboard-budget__history-item">
                    <img className="dashboard-budget__history-icon" src="img/category-icons/icon-fun.svg" alt="" />
                    <p className="dashboard-budget__history__name">
                      Развлечения
                    </p>
                    <p className="dashboard-budget__history-amount">
                      -1290 P
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal dashboard-modal">
        <div className="modal__overlay">
          <div className="modal__content dashboard-modal__content">
            <button className="modal__close-button"></button>
            <form className="dashboard-modal__form">
              <label for="amount" className="dashboard-modal__text-field">
                <span className="dashboard-modal__text-field-label">Сумма</span>
                <input className="dashboard-modal__text-field-input" type="text" name="amount" id="amount" placeholder="Введите сумму" />
              </label>
              <button className="dashboard-modal__submit-button" type="submit">Добавить</button>
            </form>
          </div>
        </div>
      </div>
      <div className="modal dashboard-modal expenses-modal">
        <div className="modal__overlay">
          <div className="modal__content dashboard-modal__content">
            <button className="modal__close-button"></button>
            <form className="dashboard-modal__form">
              <label for="amount" className="dashboard-modal__text-field">
                <span className="dashboard-modal__text-field-label">Сумма</span>
                <input className="dashboard-modal__text-field-input" type="text" name="amount" id="amount" placeholder="Введите сумму" />
              </label>
              <div className="expenses-modal__category">
                <ul className="expenses-modal__category-list category-list">
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
                <ul className="expenses-modal__category-list category-list">
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
              </div>
              <button className="dashboard-modal__submit-button" type="submit">Добавить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardBudget;