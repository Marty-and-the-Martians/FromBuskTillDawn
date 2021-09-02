/* eslint-disable react/prop-types */
import React from 'react';

const MyAccount = (props) => {
  const { profileInfo } = props;
  console.log(profileInfo);
  const {
    name, performer, followers, hostedEvents, bio, cashappURL, zipcode, photo, email,
  } = profileInfo;

  return (
    <div>
      <h3>Account Settings</h3>
      <button type="button">edit profile</button>
      <img src={photo} alt="profile avatar" />
      <div>{`Name: ${name}`}</div>
      <div>{`Email: ${email}`}</div>
      <div>{`Bio: ${bio}`}</div>
      <div>{`Home Zipcode: ${zipcode}`}</div>
      {performer
        ? (
          <div>
            <div>{`Follower Count: ${followers}`}</div>
            <div>{`payment: ${cashappURL ? cashappURL : 'Add a cashapp link for tips!'}`}</div>
          </div>
        )
        : null}
    </div>
  );
};
export default MyAccount;
