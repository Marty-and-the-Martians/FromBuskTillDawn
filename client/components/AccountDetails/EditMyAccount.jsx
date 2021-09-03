import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
  Typography, Container, TextField, Button,
} from '@material-ui/core';
import useStyles from '../hooks/useStyles';
import AppContext from '../../context';

const EditMyAccount = (props) => {
  const classes = useStyles();
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const { profileInfo, setIsEditing } = props;
  const {
    name, performer, followers, bio, cashappURL, zipcode, photo, email,
  } = profileInfo;
  const [emailEdit, setEmailEdit] = useState(email);
  const [bioEdit, setBioEdit] = useState(bio);
  const [zipcodeEdit, setZipcodeEdit] = useState(zipcode);
  const [photoEdit, setPhotoEdit] = useState(photo);
  const [cashappEdit, setCashappEdit] = useState(cashappURL);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentUser({
      ...currentUser,
      email: emailEdit,
      bio: bioEdit,
      zipcode: zipcodeEdit,
      cashappURL: cashappEdit,
      photo: photoEdit,
    });
    axios.put(`/api/user/${currentUser.id}`, {
      email: emailEdit,
      bio: bioEdit,
      zipcode: zipcodeEdit,
      cashappURL: cashappEdit,
      photo: photoEdit,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Container style={{paddingTop: '2.5em'}}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <Typography variant="h4">Account Settings</Typography>
          <TextField
            type="url"
            value={photoEdit}
            onChange={(e) => { setPhotoEdit(e.target.value); }}
            placeholder="Edit Photo URL here"
            label="Photo URL"
          />
          <TextField
            type="email"
            value={emailEdit}
            onChange={(e) => { setEmailEdit(e.target.value); }}
            placeholder="Edit Email here"
            label="Email"
          />
          <TextField
            type="textarea"
            value={bioEdit}
            onChange={(e) => { setBioEdit(e.target.value); }}
            placeholder="Edit Bio here"
            label="Bio"
          />
          <TextField
            type="text"
            value={zipcodeEdit}
            pattern="[0-9]{5}"
            onChange={(e) => { setZipcodeEdit(e.target.value); }}
            placeholder="Edit Zip Code here"
            label="Zip Code"
          />
          {
            performer
              ? (
                <div>
                  <TextField
                    type="URL"
                    value={cashappEdit}
                    onChange={(e) => { setCashappEdit(e.target.value); }}
                    placeholder="Edit CashApp URL here"
                    label="CashApp URL"
                  />

                </div>
              )
              : null
          }
          <Button type="submit" variant="contained" className={classes.submitBtn}>Done</Button>
        </form>
      </Container>
    </>
  );
};
export default EditMyAccount;
