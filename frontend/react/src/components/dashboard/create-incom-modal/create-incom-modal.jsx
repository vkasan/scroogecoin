import { useState, useEffect } from 'react';
import { useCreateTransactionMutation } from '../../../store/api';

const CreateIncomModal = (props) => {
  const { opened = false, onClose = () => undefined, } = props;
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [createTransaction, {
    isLoading: isCreating,
    isSuccess: isCreated,
  }] = useCreateTransactionMutation();


  useEffect(() => {
    onClose();
    setAmount(0);
    setDescription('');
  }, [isCreated])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (amount >= 0 && description) {
      createTransaction({
        amount,
        categoryId: 0,
        date: new Date().toISOString(),
        description,
      });
    }
    onClose();
  }
  return (
    <div className={`modal dashboard-modal incom-modal ${opened && 'modal--show'}`}>
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
                value={amount || undefined}
                onChange={(evt) => setAmount(evt.target.value)}
                required
              />
            </label>
            <label htmlFor="description" className="dashboard-modal__text-field">
              <span className="dashboard-modal__text-field-label">
                Описание
              </span>
              <input
                className="dashboard-modal__text-field-input"
                type="text"
                name="description"
                id="description"
                placeholder="Введите описание"
                value={description ?? undefined}
                onChange={(evt) => setDescription(evt.target.value)}
                required
              />
            </label>
            <button className="dashboard-modal__submit-button" type="submit">
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


export default CreateIncomModal;
