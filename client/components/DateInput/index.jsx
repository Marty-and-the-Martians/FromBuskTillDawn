import React from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import myStyles from '../hooks/useStyles';

const DateInput = ({ selectedDate, handleChange }) => {
  const classes = myStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          // format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Select Date"
          value={selectedDate}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          size="small"
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Select Time"
          value={selectedDate}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          size="small"
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateInput;
