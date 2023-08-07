import { useState } from 'react';
import axios from 'axios';
import Logo from '.././../assets/img/logoS.png';
import { Link } from 'react-router-dom';

function OrganizerRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phoneNumber: '',
    location: '',
    organizationName: '',
    website: '',
    description: '',
    address: {
      city: '',
      state: '',
      country: ''
    },
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: ''
    }
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/organizer/register', formData);

      if (response.data.success) {
        setError('');
        // Redirect the user to the login page or any other appropriate page after successful registration
        // You can use React Router for this purpose.
      } else {
        setError('Registration failed. Please check your details and try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightGray">
      <div className="max-w-sm w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <img src={Logo} alt="Logo" className="w-28 h-10 mb-2" />
          <h2 className="text-2xl font-semibold text-mediumGray">Organizer Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block font-semibold mb-1 text-mediumGray">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block font-semibold mb-1 text-mediumGray">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-mediumGray">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="userName" className="block font-semibold mb-1 text-mediumGray">
              Username
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Your username"
              value={formData.userName}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold mb-1 text-mediumGray">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block font-semibold mb-1 text-mediumGray">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block font-semibold mb-1 text-mediumGray">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Your location"
              value={formData.location}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="organizationName" className="block font-semibold mb-1 text-mediumGray">
              Organization Name
            </label>
            <input
              type="text"
              id="organizationName"
              placeholder="Your organization name"
              value={formData.organizationName}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="website" className="block font-semibold mb-1 text-mediumGray">
              Website
            </label>
            <input
              type="text"
              id="website"
              placeholder="Your website"
              value={formData.website}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold mb-1 text-mediumGray">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Your organization description"
              value={formData.description}
              onChange={handleChange}
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="city" className="block font-semibold mb-1 text-mediumGray">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    city: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="state" className="block font-semibold mb-1 text-mediumGray">
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={formData.address.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    state: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="country" className="block font-semibold mb-1 text-mediumGray">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    country: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="facebook" className="block font-semibold mb-1 text-mediumGray">
              Facebook
            </label>
            <input
              type="text"
              id="facebook"
              placeholder="Facebook URL"
              value={formData.socialMedia.facebook}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...formData.socialMedia,
                    facebook: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="twitter" className="block font-semibold mb-1 text-mediumGray">
              Twitter
            </label>
            <input
              type="text"
              id="twitter"
              placeholder="Twitter URL"
              value={formData.socialMedia.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...formData.socialMedia,
                    twitter: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="instagram" className="block font-semibold mb-1 text-mediumGray">
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              placeholder="Instagram URL"
              value={formData.socialMedia.instagram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socialMedia: {
                    ...formData.socialMedia,
                    instagram: e.target.value
                  }
                })
              }
              className="p-3 border rounded-lg w-full focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            type="submit"
            className="col-span-2 w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue focus:outline-none focus:ring focus:ring-primary"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/signin" className="text-blue">
            Already have an account? Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrganizerRegistrationForm;
