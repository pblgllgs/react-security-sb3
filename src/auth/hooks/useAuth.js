import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthentication } from "../services/authService";
import { onLogin, onLogout } from "../../store/slice/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isEnabled } = useSelector((state) => state.auth);
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
      navigate("/dashboard");
      Swal.fire("Login", "Bienvenido", "success");
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
    dispatch(onLogout());
    sessionStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/login")
  };
  return {
    handlerLogin,
    handlerLogout,
    login: { user, isEnabled },
  };
};
