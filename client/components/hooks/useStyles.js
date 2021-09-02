import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => (
  {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    pane: {
      width: '50%',
      minWidth: '450px',
      marginBottom: '1rem',
    },
    viewWindow: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    table: {
      height: '100%',
    },
    tableContainer: {
      height: '100%',
    },
    colName: {
      cursor: 'pointer',
    },
    row: {
      width: '100%',
    },
    userName: {
      cursor: 'pointer',
    },
    btn: {
      cursor: 'pointer',
    },
    // toolbar: theme.mixins.toolbar,
    // main: {
    //   display: 'flex',
    //   marginTop: '40px',
    // },
  }
));

export default useStyles;
