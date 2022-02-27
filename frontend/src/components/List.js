import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import { ListItems } from './ListItems';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

export const List = ({ listUpdate }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [items, setitems] = useState([]);
  const [itemsDelete, setDeleteitems] = useState(false);

  useEffect(() => {
    const listitems = async () => {
      setLoading(true);
      const response = await clientAxios.get(`/budgetform/${user.id}`);
      setitems(response.data);
      setLoading(false);
    };
    listitems();
  }, [user.id, listUpdate, itemsDelete]);

  const income = items.filter((item) => item.type === 'Ingreso');
  const expense = items.filter((item) => item.type === 'Egreso');

  const handleDelete = (idItem) => {
    setDeleteitems(false);
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Un concepto eliminado no puede recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          clientAxios.delete(`/budgetform/${idItem}`);
          setDeleteitems(true);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div className='flex-column'>
      <section className='container'>
        <h3 className='text-primary text-center mb-3'>Ingresos</h3>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Concepto</th>
                <th scope='col'>Monto $</th>
                <th scope='col'>Tipo</th>
                <th scope='col'>(Año-Mes-Día)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>Cargando...</td>
                </tr>
              ) : (
                income.map((item, i) => (
                  <ListItems
                    key={item.id}
                    id={++i}
                    concept={item.concept}
                    amount={item.amount}
                    type={item.type}
                    date={item.updatedAt}
                    idItem={item.id}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className='container'>
        <h3 className='text-primary text-center mb-3'>Egresos</h3>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Concepto</th>
                <th scope='col'>Monto $</th>
                <th scope='col'>Tipo</th>
                <th scope='col'>(Año-Mes-Día)</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>Cargando...</td>
                </tr>
              ) : (
                expense.map((item, i) => (
                  <ListItems
                    key={item.id}
                    id={++i}
                    concept={item.concept}
                    amount={item.amount}
                    type={item.type}
                    date={item.updatedAt}
                    idItem={item.id}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
