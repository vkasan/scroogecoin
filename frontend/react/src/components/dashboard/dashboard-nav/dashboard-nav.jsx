import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "/src/store/user-slicer";


const DashboardNav = (props) => {
  const { activeItem = '' } = props
  const dispatch = useDispatch();

  const handleLogiutClick = () => dispatch(logout())

  return (
    <div className="dashboard__nav">
      <div className="dashboard__nav-buttons">
        <Link className="dashboard__home-button" to="/"></Link>
        <button className="dashboard__logout-button"
          type="button"
          onClick={handleLogiutClick}
        />
      </div>
      <ul className="dashboard__nav-list">
        <li className="dashboard__nav-item">
          <Link
            to="/dashboard/budget"
            className={`dashboard__nav-link ${activeItem === 'budget' && 'dashboard__nav-link--active'}`}
          >
            БЮДЖЕТ
          </Link>
        </li>
        <li className="dashboard__nav-item">
          <Link
            to="/dashboard/category"
            className={`dashboard__nav-link ${activeItem === 'category' && 'dashboard__nav-link--active'}`}
          >
            КАТЕГОРИЯ
          </Link>
        </li>
        {/* <li className="dashboard__nav-item">
          <a href="#" className="dashboard__nav-link">
            ДИАГРАММА
          </a>
        </li> */}
        <li className="dashboard__nav-item">
          <Link
            to="/dashboard/profile"
            className={`dashboard__nav-link ${activeItem === 'profile' && 'dashboard__nav-link--active'}`}
          >
            ПЕРСОНАЛЬНЫЕ ДАННЫЕ
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default DashboardNav;
