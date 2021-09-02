import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../../context';

const EditMyAccount = (props) => {
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
    <form onSubmit={handleSubmit}>
      <h3>Account Settings</h3>
      <div>{name}</div>
      <input type="url" value={photoEdit} onChange={(e) => { setPhotoEdit(e.target.value); }} placeholder="Edit Photo URL here" />
      <input type="email" value={emailEdit} onChange={(e) => { setEmailEdit(e.target.value); }} placeholder="Edit Email here" />
      <input type="textarea" value={bioEdit} onChange={(e) => { setBioEdit(e.target.value); }} placeholder="Edit Bio here" />
      <input type="text" value={zipcodeEdit} pattern="[0-9]{5}" onChange={(e) => { setZipcodeEdit(e.target.value); }} placeholder="Edit Zip Code here" />
      {
        performer
          ? (
            <div>
              <div>{`Follower Count: ${followers}`}</div>
              <input type="URL" value={cashappEdit} onChange={(e) => { setCashappEdit(e.target.value); }} placeholder="Edit CashApp URL here" />

            </div>
          )
          : null
      }
      <input type="submit" value="Done" />
    </form>
  );
};
export default EditMyAccount;
