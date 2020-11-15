import Axios from '../apis/Axios';

export const signup = async function (username, email, password, passwordConfirm) {

    var registrationData = {username, email, password, passwordConfirm}
  try {
   await Axios.post("/users/register", registrationData);

  } catch (error) {
    alert("An error occurred");
  }
};