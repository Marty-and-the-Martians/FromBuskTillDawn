import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import StyledTableRow from '../../StyledMaterialComponents/StyledTableRow';

const CalRowContainer = ({ styled, children }) => {
  if (styled) {
    return (
      <StyledTableRow>
        {children}
      </StyledTableRow>
    );
  }
  return (
    <TableRow hover>
      {children}
    </TableRow>
  );
};

export default CalRowContainer;
