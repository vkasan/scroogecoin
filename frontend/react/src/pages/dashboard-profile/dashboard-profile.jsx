import { useEffect, useState } from 'react';
import DashboardNav from "../../components/dashboard/dashboard-nav/dashboard-nav.jsx";
import { useGetUserDataQuery, useUpdateUserDataMutation } from "../../store/api.js";


const DashboardProfile = () => {
  const { data: userData } = useGetUserDataQuery();
  const [userName, setUserName] = useState("");
  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    if (userData?.name) {
      setUserName(userData?.name ?? '');
    }
  }, [userData?.name]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updateUserData({ name: userName });
  }

  return (
    <div className="dashboard">
      <DashboardNav activeItem="profile" />
      <div className="dashboard__content">
        <div className="dashboard__wrapper">
          <div className="dashboard-profile">
            <div className="dashboard-profile__avatar"></div>

            <div className="dashboard-profile__info" onSubmit={handleSubmit}>
              <form action="" className="dashboard-profile__form">
                <label htmlFor="name" className="dashboard-profile__text-field">
                  <span className="dashboard-profile__text-field-label">Имя</span>
                  <input className="dashboard-profile__text-field-input"
                    type="text"
                    name="name"
                    id="name"
                    value={userName}
                    onChange={(evt) => setUserName(evt.target.value)}
                  />
                </label>
                {/* <label htmlFor="birthday" className="dashboard-profile__text-field">
                  <span className="dashboard-profile__text-field-label">Дата рождения</span>
                  <input className="dashboard-profile__text-field-input" type="text" name="birthday" id="birthday" value="01.02.2000" />
                </label> */}
                {/* <label htmlFor="budget" className="dashboard-profile__text-field">
                  <span className="dashboard-profile__text-field-label">Бюджет</span>
                  <input className="dashboard-profile__text-field-input" type="text" name="budget" id="budget" value="15000" />
                </label> */}
                <button className="dashboard-profile__submit" type="submit">Сохранить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfile;
