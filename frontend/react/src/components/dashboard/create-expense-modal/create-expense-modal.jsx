import { useState, useEffect } from 'react';

import { useCreateTransactionMutation, useGetCategoriesQuery } from "../../../store/api";

const CreateExpenseModal = (props) => {
  const { opened = false, onClose = () => undefined, } = props;
  const [selectedCategoryId, setSelectedCategoryID] = useState(null);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [createTransaction, {
    isLoading: isCreating,
    isSuccess: isCreated,
  }] = useCreateTransactionMutation();
  const { data: categories = {}, isLoading } = useGetCategoriesQuery();
  const categoriesList = Object.values(categories);

  useEffect(() => {
    onClose();
    setSelectedCategoryID(null);
    setAmount(0);
    setDescription('');
  }, [isCreated])

  const handleCategoryCick = (category) => {
    setSelectedCategoryID(category);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log({
      amount,
      categoryId: selectedCategoryId,
      date: new Date().toISOString(),
      description,
    })
    if (selectedCategoryId && amount) {
      createTransaction({
        amount: -amount,
        categoryId: selectedCategoryId,
        date: new Date().toISOString(),
        description,
      });
    }
  }

  return (
    <div className={`modal dashboard-modal expenses-modal ${opened && 'modal--show'}`}>
      <div className="modal__overlay">
        <div className="modal__content dashboard-modal__content">
          <button className="modal__close-button" onClick={onClose} />
          <form className="dashboard-modal__form" onSubmit={handleSubmit} disabled={isCreating}>
            <label htmlFor="amount" className="dashboard-modal__text-field">
              <span className="dashboard-modal__text-field-label">Сумма</span>
              <input
                className="dashboard-modal__text-field-input"
                type="number"
                name="amount"
                id="amount"
                placeholder="Введите сумму"
                value={amount ?? undefined}
                onChange={(evt) => setAmount(evt.target.value)}
                required
              />
            </label>
            <label htmlFor="description" className="dashboard-modal__text-field">
              <span className="dashboard-modal__text-field-label">Описание</span>
              <input
                className="dashboard-modal__text-field-input"
                type="text"
                name="description"
                id="description"
                placeholder="Введите описание"
                value={description ?? undefined}
                onChange={(evt) => setDescription(evt.target.value)}
              />
            </label>
            <div className="expenses-modal__category">
              {isLoading
                ? <p>Loading...</p>
                : (
                  <ul className="expenses-modal__category-list category-list">
                    {categoriesList?.map((item) => (
                      <li
                        className={`category-list__item ${selectedCategoryId === item.id && 'category-list__item--active'}`}
                        key={item.id}
                        title={item.name}
                        onClick={() => handleCategoryCick(item.id)}
                      >
                        <img
                          className="category-list__icon"
                          src={item.icon}
                          alt=""
                        />
                        <span className="category-list__name">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <button className="dashboard-modal__submit-button" type="submit">
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateExpenseModal;
