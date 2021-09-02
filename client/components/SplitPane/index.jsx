import React from 'react';

import Container from '@material-ui/core/Container';
import useStyles from '../hooks/useStyles';

const SplitPane = ({ left, right }) => {
  const classes = useStyles();
  return (
    <Container maxWidt="xl" className={classes.viewWindow}>
      <Container className={classes.pane}>
        {left}
      </Container>
      <Container className={classes.pane}>
        {right}
      </Container>
    </Container>
  );
};

export default SplitPane;
