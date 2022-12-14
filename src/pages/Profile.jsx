import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

function Profile() {
  const auth = getAuth();
  // It uses the pre-filled the user's name and email then store it in formData
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  return <></>;
}

export default Profile;
