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
    // toolbar: theme.mixins.toolbar,
    // main: {
    //   display: 'flex',
    //   marginTop: '40px',
    // },
  }
));

export default useStyles;
