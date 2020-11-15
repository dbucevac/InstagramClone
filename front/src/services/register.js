import Axios from '../apis/Axios';

export const signup = async function (registrationData) {
  try {
    await Axios.post("/users/register", registrationData);

    window.location.reload();
  } catch (error) {
    alert("Could not sign up.");
  }
};