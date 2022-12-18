import { useState } from 'react';

function CreateListing() {
  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedroom: 1,
    bathroom: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });
  return <div>Create</div>;
}

export default CreateListing;
