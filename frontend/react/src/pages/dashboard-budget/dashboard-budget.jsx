import CreateExpenseModal from "../../components/dashboard/create-expense-modal/create-expense-modal.jsx";
import CreateIncomModal from "../../components/dashboard/create-incom-modal/create-incom-modal.jsx";
import DashboardNav from "../../components/dashboard/dashboard-nav/dashboard-nav.jsx";
import { useState } from 'react';
import { useDeleteTransactionMutation, useGetCategoriesQuery, useGetTransactionsQuery } from "../../store/api.js";
import { categoryIcon } from "../../conts.js";

const DashboardBudget = () => {
  const [openedModal, setOpenedModal] = useState(null);
  const { data: categories = {}, isLoading, isSuccess } = useGetCategoriesQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const { data } = useGetTransactionsQuery();
  const closeModal = () => setOpenedModal(null);

  const transactionsList = data?.transactions.map((item) => ({
    ...item,
    icon: categories[item.category_id]?.icon ?? categoryIcon['income'],
    description: item.description || categories[item.category_id]?.name || '',
    amount: item.amount > 0 ? `+${item.amount}` : item.amount,
  }))

  const totalAmount = data?.transactions.reduce((sum, item) => sum + item.amount, 0);

  const handleDeleteTransaction = (id) => {
    deleteTransaction({ id })
  }

  return (
    <div className="dashboard">
      <DashboardNav activeItem="budget" />
      <div className="dashboard__content">
        <div className="dashboard__wrapper">
          <div className="dashboard-budget">
            <div className="dashboard-budget__wrapper">
              <p className="dashboard-budget__total-amount">{totalAmount}</p>
              <div className="dashboard-budget__controls">
                <button className="dashboard-budget__controls-button"
                  onClick={() => setOpenedModal('create-income-modal')}>
                  Добавить доход
                </button>
                <button className="dashboard-budget__controls-button dashboard-budget__controls-button--orange"
                  onClick={() => setOpenedModal('create-expense-modal')}>
                  Добавить расходы
                </button>
              </div>

              <div className="dashboard-budget__histoy">
                <ul className="dashboard-budget__history-list">
                  {transactionsList?.map((item) => (
                    <li className="dashboard-budget__history-item" key={item.id}>
                      <img className="dashboard-budget__history-icon" src={item.icon} alt="" />
                      <p className="dashboard-budget__history__name">
                        {item.description}
                      </p>
                      <p className="dashboard-budget__history-amount">
                        {item.amount} P
                      </p>
                      <button
                        className="dashboard-budget__history-delete"
                        onClick={() => handleDeleteTransaction(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateExpenseModal
        opened={openedModal === 'create-expense-modal'}
        onClose={closeModal}
      />
      <CreateIncomModal
        opened={openedModal === 'create-income-modal'}
        onClose={closeModal}
      />
    </div>
  )
}

export default DashboardBudget;
