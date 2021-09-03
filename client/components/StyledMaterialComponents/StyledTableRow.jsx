import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.success.main,
    },
  },
}))(TableRow);

export default StyledTableRow;
