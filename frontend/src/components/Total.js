import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/authContext';
import clientAxios from '../config/axios';

export const Total = ({ listUpdate }) => {
  const { user } = useContext(AuthContext);
  const [items, setitems] = useState([]);

  useEffect(() => {
    const listitems = async () => {
      const response = await clientAxios.get(`/budgetform/${user.id}`);
      setitems(response.data);
    };
    listitems();
  }, [user.id, listUpdate]);

  const income = items.filter((item) => item.type === 'Ingreso');
  const expense = items.filter((item) => item.type === 'Egreso');

  let total = 0;

  // if (loading) {
  const initialValue = 0;
  const incomeAmount = income
    .map((item) => item.amount)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );

  const expenseAmount = expense
    .map((item) => item.amount)
    .reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );

  total = incomeAmount - expenseAmount;
  // }

  return (
    <div className='col'>
      <div className='p-3'>
        <h2 className='text-center'>Balance</h2>

        <div className='budget'>
          <div className='alert alert-primary'>
            <p>
              Balance: $ <span className='fw-bold'>{total}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
