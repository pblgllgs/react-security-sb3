import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuthentication } from "../services/authService";
import { onLogin, onLogout } from "../../store/slice/auth/authSlice";
import { loadingCustomers } from "../../store/slice/customer/customerSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerLogin = async ({ email, password }) => {
    try {
      const response = await getAuthentication({ email, password });
      const { userDto, token } = response.data;
      dispatch(
        onLogin({
          user: userDto,
          isEnabled: userDto.enabled,
        })
      );
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role",userDto.role)
      sessionStorage.setItem("user",JSON.stringify(userDto));
      sessionStorage.setItem("isAuth",JSON.stringify(true));
      sessionStorage.setItem("isEnabled",JSON.stringify(userDto.enabled));
      navigate("/dashboard");
      return userDto;
    } catch (e) {
      if (e.response?.status === 401) {
        Swal.fire(
          "Error de validación",
          "Username o password incorrectos",
          "error"
        );
      } else if (e.response?.status === 403) {
        Swal.fire("Error", "Permisos insuficientes", "error");
      } else {
        throw new Error();
      }
    }
  };

  const handlerLogout = () => {
    dispatch(loadingCustomers([]))
    sessionStorage.removeItem("token");
    dispatch(onLogout());
    sessionStorage.clear();
    navigate("/login")
  };
  return {
    handlerLogin,
    handlerLogout,
  };
};
