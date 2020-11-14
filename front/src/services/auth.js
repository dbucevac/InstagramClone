import Axios from '../apis/Axios';

export const login = async function (credentials) {
  try {
    let response = await Axios.post("/users/login", credentials);
    let token = response.data;

    console.log(token);

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("username", credentials.username)


    window.location.reload();
  } catch (error) {
    alert("Could not log in.");
  }
};

export const logout = function(){
    window.localStorage.removeItem("token");
    window.location.reload();
}