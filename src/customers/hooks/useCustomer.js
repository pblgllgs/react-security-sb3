import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../store/slice/customer/customerSlice";
import { saveCustomer } from "../services/customerService";

export const useCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerAddCustomer = async (customer) => {
    try {
      const response = await saveCustomer(customer);
      const payload = response.data
      dispatch(
        addCustomer(payload)
      );
      navigate("/dashboard");
      Swal.fire("Creación exitosa", "El customer se ha creado con exito", "success");
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

  return {
    handlerAddCustomer
  };
};
