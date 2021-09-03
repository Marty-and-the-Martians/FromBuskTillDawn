import React, { useContext } from 'react';

import TableRow from '@material-ui/core/TableRow';
import StyledTableRow from '../../StyledMaterialComponents/StyledTableRow';
import AppContext from '../../../context';

const CalRowContainer = ({ styled, children, event }) => {
  const { setSelected } = useContext(AppContext);
  if (styled) {
    return (
      <StyledTableRow
        onClick={() => {
          setSelected(event); console.log(event);
        }}
      >
        {children}
      </StyledTableRow>
    );
  }
  return (
    <TableRow hover
      onClick={() => {
        setSelected(event); console.log(event);
      }}
    >
      {children}
    </TableRow>
  );
};

export default CalRowContainer;
