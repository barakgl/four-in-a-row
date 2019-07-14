import React from 'react';
import Cell from '../Cell/Cell';

const Row = ({ row, play }) => {
    return (
      <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} play={play} />)}
      </tr>
    );
  };

  export default Row;