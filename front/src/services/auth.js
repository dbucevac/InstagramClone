import Axios from '../apis/Axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export const login = async function (credentials) {
  toast.configure()
  try {
    let response = await Axios.post("/users/login", credentials);
    let token = response.data;

    console.log(token);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("username", credentials.username)


    window.location.reload();
  } catch (error) {
    toast.error("Account with the given credentials doesn't exist. Please try again", {position: toast.POSITION.TOP_CENTER})
  }
};

export const logout = function(){
    window.localStorage.removeItem("token");
    window.location.reload();
}