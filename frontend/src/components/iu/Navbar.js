import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const firstLetter = user.name.substr(0, 1);

  const handleLogout = () => {
    dispatch({ type: types.logout });

    navigate('/login', {
      replace: true,
    });
  };

  return (
    <nav className='p-2 navbar navbar-expand navbar-dark bg-dark'>
      <div className='navbar-collapse'>
        <div className='navbar-nav'>
          <NavLink
            className={({ isActive }) =>
              'nav-item nav-link' + (isActive ? ' active' : '')
            }
            to='/home'>
            <span className=' p-1 fs-4 '> {firstLetter}</span>
          </NavLink>
        </div>
      </div>

      <div className='navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end'>
        <ul className='navbar-nav ml-auto'>
          <span className='nav-item nav-link text-info'>{user.name}</span>

          <button className='nav-item nav-link btn' onClick={handleLogout}>
            Cerrar sesión
          </button>
        </ul>
      </div>
    </nav>
  );
};
