import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clientAxios from '../config/axios';
import { useForm } from '../hooks/useForm';

export const EditItems = () => {
  let navigate = useNavigate();
  const { idItem } = useParams();

  const initialState = {
    concept: '',
    amount: '',
  };

  const [formValues, handleInputChange, reset] = useForm(initialState);

  const { concept, amount } = formValues;

  const handleEdit = async (e) => {
    e.preventDefault();

    if (concept === '' || amount === '') {
      return Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    } else {
      try {
        const response = await clientAxios.put(`/budgetform/${idItem}`, {
          concept,
          amount,
        });

        if (response.status === 200) {
          Swal.fire(
            'Modificado!',
            'Usted ha modificado el concepto correctamente',
            'success'
          );
          reset();
        } else {
          Swal.fire('Error', 'Algo salio mal', 'error');
        }
      } catch (error) {
        console.error(error);
      }
    }

    navigate('/home', {
      replace: true,
    });
  };

  return (
    <div className='container mt-4'>
      <main className='main-content'>
        <div className='row'>
          <div className='col'>
            <div className='p-3 '>
              <h2 className='text-center fs-3 fw-bolder'>Modificar campos</h2>

              <form onSubmit={handleEdit}>
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
                    placeholder='Cantidad en $'
                    onChange={handleInputChange}
                  />
                </div>

                <button type='submit' className='btn btn-primary mt-3 me-3'>
                  Modificar
                </button>
                <Link to='/home' className='btn btn-danger mt-3'>
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
