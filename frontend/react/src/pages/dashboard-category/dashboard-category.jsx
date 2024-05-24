import { useState } from "react";

import DashboardNav from "../../components/dashboard/dashboard-nav/dashboard-nav.jsx";
import CreateCategoryModal from "../../components/dashboard/create-category-modal/create-category-modal";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../store/api";


const DaashboardCategory = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { data: categories = {}, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const categoriesList = Object.values(categories);

  const openModal = () => setIsModalOpened(true);
  const closeModal = () => setIsModalOpened(false);
  const handleDeleteCategory = (id) => {
    deleteCategory({ id });
    setDeleting(false)
  }

  const handleDelete = () => {
    setDeleting((prev) => !prev);
  }

  return (
    <div className="dashboard">
      <DashboardNav activeItem="category" />
      <div className="dashboard__content">
        <div className="dashboard__wrapper">
          <div className="dashboard-category">
            <div className="dashboard-category__wrapper">
              {isLoading
                ? <p>Loading...</p>
                : (
                  <ul className="dashboard-category__list category-list">
                    {categoriesList?.map((item) => (
                      <li
                        className={`category-list__item ${deleting && 'category-list__item--delete'}`}
                        key={item.id}
                        title={item.name}
                      >
                        <img
                          className="category-list__icon"
                          src={item.icon}
                          alt=""
                        />
                        <button
                          className="category-list__item-delete"
                          onClick={() => handleDeleteCategory(item.id)}
                          disabled={!deleting}
                        />
                        <span className="category-list__name">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                )}

              <button className="dashboard-category__button" type="butotn" onClick={openModal}>
                Добавить категорию
              </button>
              <button className="dashboard-category__delete-button" onClick={handleDelete}>
                Удалить категорию
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateCategoryModal opened={isModalOpened} onClose={closeModal} />
    </div >
  )
}

export default DaashboardCategory;
