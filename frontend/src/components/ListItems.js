import React from 'react';
import { Link } from 'react-router-dom';

export const ListItems = ({
  concept,
  amount,
  type,
  id,
  date,
  idItem,
  handleDelete,
}) => {
  const dateShort = date.substr(0, 10);

  return (
    <>
      <tr>
        <th scope='row'>{id}</th>
        <td>{concept}</td>
        <td>{amount}</td>
        <td>{type}</td>
        <td>{dateShort}</td>

        <td className='d-flex justify-content-evenly'>
          <Link to={`/edititems/${idItem}`} className='btn btn-outline-info'>
            <i className='fa fa-pencil-alt'></i>
          </Link>
          <button
            className='btn btn-outline-danger'
            onClick={() => handleDelete(idItem)}>
            <i className='fa fa-trash'></i>
          </button>
        </td>
      </tr>
    </>
  );
};
