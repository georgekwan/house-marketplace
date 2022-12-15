import { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  // initialize the Auth library
  const auth = getAuth();
  // Detail get update whenever submit button has been pres s
  const [changeDetails, setChangeDetails] = useState(false);
  // It uses the pre-filled the user's name and email then store it in formData
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // Destructure formData
  const { name, email } = formData;

  const navigate = useNavigate();

  // back to home after user has sign out
  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onSubmit = () => {
    console.log(123);
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState);
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
