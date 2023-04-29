import { useState } from "react";
// import { newProfile } from '../utilities/profiles-service';
// import { editProfile } from '../utilities/profiles-service';

function ProfileForm({setProfile}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  });

  const disable = formData.password !== formData.confirm;

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    
    try {
      console.log(formData)
      // data to be send to the backend to create a new user
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }
      // returns a token with the user info
    //   const user = await signUp(userData); // user service
    //   setUser(user);

    } catch (error) {
      setFormData({...formData, error: "Sign Up Failed - Try Again"})
    }
};

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value, error: ''})
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
            
            <label>Email</label>
            <input type="text" name="email" value={formData.email} onChange={handleChange} required/>
            
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
            
            <label>Confirm</label>
            <input type="password" name="confirm" value={formData.confirm} onChange={handleChange} required/>

            <button type="submit" disabled={disable}>Create New Account</button>
        </form>
      </div>

      <p className="error-message">{formData.error}</p>
    </div>
  );
}

export default ProfileForm;