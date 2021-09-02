/* eslint-disable react/button-has-type */
import React, { useContext } from 'react';

import Container from '@material-ui/core/Container';

import AppContext from '../../context';
import MapViewer from '../MapViewer';
import CalViews from './CalViews';
import SplitPane from '../SplitPane';

const Home = () => {
  const {
    eventFetch,
    myCalendar,
    currentUser,
    eventFetchDate,
    setEventFetchDate,
  } = useContext(AppContext);
  return (
    <SplitPane
      left={<MapViewer />}
      right={(
        <Container>
          <Container>
            <input
              type="date"
              // value={(new Date(eventFetchDate)).toISOString().slice(0, 10)}
              onChange={
                (event) => {
                  setEventFetchDate(new Date(
                    new Date(event.target.value)
                      .getTime() + (6 * 60 * 60 * 1001),
                  )
                    .toString());
                }
              }
            />
            <button> Local Events </button>
            {currentUser.id
              ? <button onClick={myCalendar}> My Schedule </button>
              : null}
          </Container>
          <CalViews />
        </Container>
      )}
    />
  );
};

export default Home;
