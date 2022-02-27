import React, { useContext, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../auth/authContext';
import './styles/home.css';
import Swal from 'sweetalert2';
import { fetchWithoutToken } from '../helpers/fetch';
import { List } from './List';
import { Total } from './Total';

export const Home = () => {
  const { user } = useContext(AuthContext);

  const [listUpdate, setlistUpdate] = useState(true);

  const initialState = {
    concept: '',
    amount: '',
    type: '',
    userId: user.id,
  };

  const [formValues, handleInputChange, reset] = useForm(initialState);

  const { concept, amount, type, userId } = formValues;

  const handleAdd = async (e) => {
    e.preventDefault();

    if (concept === '' || amount === '' || type === '') {
      return Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    } else {
      try {
        const resp = await fetchWithoutToken(
          'budgetform',
          {
            concept,
            amount,
            type,
            userId,
          },
          'POST'
        );
        const body = await resp.json();

        if (resp.ok) {
          Swal.fire(
            'Agregado!',
            'Usted ha agregado el concepto correctamente',
            'success'
          );
          reset();
        } else {
          Swal.fire('Error', body.errors[0].msg, 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }

    setlistUpdate(false);
  };

  return (
    <div className='container my-4'>
      <header>
        <h1 className='text-center'>Presupuesto Mensual</h1>
      </header>
      <main className='main-content'>
        <div className='row'>
          <div className='col'>
            <div className='p-3'>
              <h2 className='text-center'>Agregue ingresos o egresos aqui</h2>

              <form id='agregar-gasto' onSubmit={handleAdd}>
                <div className='form-group'>
                  <label htmlFor='concepto'>Concepto:</label>
                  <input
                    type='text'
                    value={concept}
                    name='concept'
                    className='form-control'
                    placeholder='Concepto'
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group mt-3'>
                  <label htmlFor='cantidad'>Monto:</label>
                  <input
                    type='number'
                    name='amount'
                    value={amount}
                    className='form-control'
                    placeholder='Monto en $'
                    onChange={handleInputChange}
                  />
                </div>

                <div className='form-group mt-3'>
                  <p>Seleccione el tipo:</p>

                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='type'
                      id='flexRadioDefault1'
                      onChange={handleInputChange}
                      value='Egreso'
                      checked={type === 'Egreso' ? true : false}
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexRadioDefault1'>
                      Egreso
                    </label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      name='type'
                      id='flexRadioDefault2'
                      onChange={handleInputChange}
                      value='Ingreso'
                      checked={type === 'Ingreso' ? true : false}
                    />
                    <label
                      className='form-check-label'
                      htmlFor='flexRadioDefault2'>
                      Ingreso
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary mt-3'
                  onClick={() => {
                    setlistUpdate(true);
                  }}>
                  Agregar
                </button>
              </form>
            </div>
          </div>

          <Total listUpdate={listUpdate} />
        </div>
        <section>
          <List listUpdate={listUpdate} />
        </section>
      </main>
    </div>
  );
};
