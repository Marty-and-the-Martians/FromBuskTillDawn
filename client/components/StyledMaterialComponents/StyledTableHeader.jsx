import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableHeader = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey.A200,
  },
}))(TableRow);

export default StyledTableHeader;
