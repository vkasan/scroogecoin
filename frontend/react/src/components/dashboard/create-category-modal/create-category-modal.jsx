import { useState, useEffect } from 'react';
import { catygoryIcons } from '../../../conts';
import { useCreateCategoryMutation } from '../../../store/api';

const CreateCategoryModal = (props) => {
  const { opened = false, onClose = () => undefined, } = props;
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [createCategory, { isLoading, isSuccess, isError }] = useCreateCategoryMutation();

  const reset = () => {
    setSelectedIcon(null);
    setCategoryName('');
  }

  const handleIconClick = (icon) => {
    setSelectedIcon((prevIcon) => {
      if (prevIcon === icon) {
        return null;
      }
      return icon;
    });
  }

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (categoryName) {
      createCategory({
        name: categoryName,
        icon: selectedIcon,
      })
    }
  }

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess])

  return (
    <div className={`modal category-modal ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content dashboard-modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <form className="dashboard-modal__form" onSubmit={handleFormSubmit}>
            <label htmlFor="category-name" className="dashboard-modal__text-field">
              <span className="dashboard-modal__text-field-label">Название</span>
              <input className="dashboard-modal__text-field-input"
                type="text"
                name="category-name"
                id="category-name"
                placeholder="Введите сумму"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>

            <ul className="category-modal__icons-list category-list">
              {catygoryIcons.map((item) => (
                <li
                  className={`category-list__item ${selectedIcon === item.name && 'category-list__item--active'}`}
                  key={item.name}
                  onClick={() => handleIconClick(item.name)}
                >
                  <img className="category-list__icon" src={item.icon} alt="" />
                </li>
              ))}
            </ul>
            <button className="dashboard-modal__submit-button" type="submit">
              Добавить категорию
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCategoryModal;
