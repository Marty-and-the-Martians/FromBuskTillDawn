import React, { useContext } from 'react';
import TableRow from '@material-ui/core/TableRow';

import AppContext from '../../../context';

import StyledTableRow from '../../StyledMaterialComponents/StyledTableRow';

const CalRowContainer = ({ styled, event, children }) => {
  const { setSelected } = useContext(AppContext);
  if (styled) {
    return (
      <StyledTableRow
        onClick={() => {
          setSelected(event);
        }}
      >
        {children}
      </StyledTableRow>
    );
  }
  return (
    <TableRow
      onClick={() => {
        setSelected(event);
      }}
      hover
    >
      {children}
    </TableRow>
  );
};

export default CalRowContainer;
