import Axios from '../apis/Axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const signup = async function (username, email, password, passwordConfirm) {
  toast.configure()
  var registrationData = {username, email, password, passwordConfirm}
  try {
   await Axios.post("/users/register", registrationData);

  } catch (error) {
    toast.error("An error occurred", {position: toast.POSITION.TOP_CENTER})
  }
};