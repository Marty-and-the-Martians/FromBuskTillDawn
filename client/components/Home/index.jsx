/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MapViewer from '../MapViewer';
import CalViews from './CalViews';
import DateInput from '../DateInput';
import SplitPane from '../SplitPane';
import AppContext from '../../context';
import useStyles from '../hooks/useStyles';

const Home = () => {
  const classes = useStyles();
  const {
    eventFetch,
    myCalendar,
    currentUser,
    eventFetchDate,
    setEventFetchDate,
    setSelected,
  } = useContext(AppContext);

  const handleTimeChange = (date) => {
    setEventFetchDate(date.toString());
    setSelected(null);
  };

  return (
    <SplitPane
      left={<MapViewer />}
      right={(
        <Container>
          <Container className={classes.calendarToolbar} disableGutters>
            <DateInput selectedDate={eventFetchDate} handleChange={handleTimeChange} />
            {/* <input
              type="date"
              value={new Date(eventFetchDate).toISOString().slice(0, 10)}
              onChange={(event) => {
                setEventFetchDate(new Date(new Date(event.target.value).getTime() + (6 * 60 * 60 * 1001)).toString());
                setSelected(null);
              }}
            /> */}
            <ButtonGroup className={classes.calBtnGroup}>
              <Button variant="contained" className={classes.calBarBtn} onClick={eventFetch}>Events</Button>
              {currentUser.id
                ? <Button variant="contained" className={classes.calBarBtn} onClick={myCalendar}>Schedule</Button>
                : null}
            </ButtonGroup>
          </Container>
          <CalViews />
        </Container>
      )}
    />
  );
};

export default Home;
