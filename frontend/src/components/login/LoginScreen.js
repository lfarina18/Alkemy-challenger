import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { types } from '../../types/types';
import { useForm } from '../../hooks/useForm';
import { fetchWithoutToken } from '../../helpers/fetch';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword1: '',
    rPassword2: '',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(lEmail)) {
      Swal.fire('Error', 'El correo no puede estar vacio', 'error');
      return false;
    } else if (!validator.isEmail(lEmail)) {
      Swal.fire('Error', 'No es un correo válido', 'error');
      return false;
    } else if (validator.isEmpty(lPassword)) {
      Swal.fire('Error', 'La contraseña no puede estar vacia', 'error');
      return false;
    }

    try {
      const resp = await fetchWithoutToken(
        'auth/login',
        { email: lEmail, password: lPassword },
        'POST'
      );
      const body = await resp.json();

      if (resp.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        const action = {
          type: types.login,
          payload: {
            id: body.id,
            name: body.name,
          },
        };
        dispatch(action);

        const lastPath = localStorage.getItem('lastPath') || '/home';

        navigate(lastPath, {
          replace: true,
        });
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(rName)) {
      Swal.fire('Error', 'El nombre no puede estar vacio', 'error');
      return false;
    } else if (validator.isEmpty(rEmail)) {
      Swal.fire('Error', 'El correo no puede estar vacio', 'error');
      return false;
    } else if (!validator.isEmail(rEmail)) {
      Swal.fire('Error', 'No es un correo válido', 'error');
      return false;
    } else if (
      !validator.equals(rPassword1, rPassword2) ||
      validator.isEmpty(rPassword1)
    ) {
      Swal.fire('Error', 'La contraseña es incorrecta', 'error');
      return false;
    }

    try {
      const resp = await fetchWithoutToken(
        'users',
        { name: rName, email: rEmail, password: rPassword1 },
        'POST'
      );
      const body = await resp.json();

      if (resp.ok) {
        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        const action = {
          type: types.login,
          payload: {
            id: body.id,
            name: body.name,
          },
        };
        dispatch(action);

        Swal.fire(
          'Registrado!',
          'Usted se ha registrado correctamente',
          'success'
        );
        const lastPath = localStorage.getItem('lastPath') || '/home';

        navigate(lastPath, {
          replace: true,
        });
      } else {
        const err = body.errors[0].msg;
        Swal.fire('Error', err, 'error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      className='vh-full'
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2016/08/03/09/04/universe-1566161_960_720.jpg')",
      }}>
      <div className='container py-5 h-100'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col col-md-8'>
            <div
              className='card bg-black p-2 text-white bg-opacity-75'
              style={{ borderRadius: '1rem' }}>
              <div className='d-flex justify-content-center'>
                <div className=' col-md-12 col-lg-10'>
                  <div className='card-body p-4 p-lg-5 '>
                    <form onSubmit={handleLogin}>
                      <div className='d-flex align-items-center mb-3 pb-1'>
                        <span className='h2 fw-bold mb-0 text-center'>
                          Administrador de presupuesto personal
                        </span>
                      </div>

                      <h5
                        className='fw-normal mb-3 pb-3'
                        style={{ letterSpacing: '1px' }}>
                        Iniciar sesión en su cuenta
                      </h5>

                      <div className='form-outline mb-3'>
                        <input
                          type='email'
                          name='lEmail'
                          className='form-control form-control-lg'
                          placeholder='@'
                          value={lEmail}
                          onChange={handleLoginInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example17'>
                          Correo
                        </label>
                      </div>

                      <div className='form-outline mb-3'>
                        <input
                          type='password'
                          name='lPassword'
                          className='form-control form-control-lg'
                          placeholder='********'
                          autoComplete='off'
                          value={lPassword}
                          onChange={handleLoginInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example27'>
                          Contraseña
                        </label>
                      </div>

                      <div className='pt-1 mb-5'>
                        <button
                          className='btn btn-outline-primary btn-lg btn-block'
                          type='submit'>
                          Iniciar sesión
                        </button>
                      </div>
                    </form>
                    {/* Register Form */}
                    <p className='mb-3 pb-lg-2 text-center h5'>
                      ¿No tienes una cuenta?{' '}
                    </p>

                    <form onSubmit={handleRegister}>
                      <h5
                        className='fw-normal mb-3 pb-3'
                        style={{ letterSpacing: '1px' }}>
                        Registrese aquí
                      </h5>

                      <div className='form-outline mb-3'>
                        <input
                          type='name'
                          name='rName'
                          className='form-control form-control-lg'
                          placeholder='Juan Perez'
                          value={rName}
                          onChange={handleRegisterInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example17'>
                          Nombre
                        </label>
                      </div>
                      <div className='form-outline mb-3'>
                        <input
                          type='email'
                          name='rEmail'
                          className='form-control form-control-lg'
                          placeholder='@'
                          value={rEmail}
                          onChange={handleRegisterInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example17'>
                          Correo
                        </label>
                      </div>

                      <div className='form-outline mb-3'>
                        <input
                          type='password'
                          name='rPassword1'
                          className='form-control form-control-lg'
                          placeholder='Contraseña'
                          autoComplete='off'
                          value={rPassword1}
                          onChange={handleRegisterInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example27'>
                          Contraseña
                        </label>
                      </div>
                      <div className='form-outline mb-3'>
                        <input
                          type='password'
                          name='rPassword2'
                          className='form-control form-control-lg'
                          placeholder='Repita la contraseña'
                          autoComplete='off'
                          value={rPassword2}
                          onChange={handleRegisterInputChange}
                        />
                        <label className='form-label' htmlFor='form2Example27'>
                          Contraseña
                        </label>
                      </div>

                      <div className='pt-1 mb-4'>
                        <button
                          className='btn btn btn-outline-primary btn-lg btn-block'
                          type='submit'>
                          Registrese
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
