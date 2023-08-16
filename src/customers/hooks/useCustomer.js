import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addCustomer,
  removeCustomer,
  updateCustomer,
} from "../../store/slice/customer/customerSlice";
import {
  deleteCustomer,
  putCustomer,
  saveCustomer,
} from "../services/customerService";

export const useCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlerAddCustomer = async (customer) => {
    try {
      const response = await saveCustomer(customer);
      const payload = response.data;
      dispatch(addCustomer(payload));
      navigate("/dashboard");
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

  const handlerDeleteCustomer = async (customer) => {
    try {
      const response = await deleteCustomer(customer);
      const payload = response.data;
      dispatch(removeCustomer(payload));
      navigate("/dashboard");
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

  const handlerUpdateCustomer = async ( id, customer ) => {
    try {
      await putCustomer(id, customer);
      dispatch(updateCustomer(id, customer));
      navigate("/dashboard");
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
    handlerAddCustomer,
    handlerDeleteCustomer,
    handlerUpdateCustomer,
  };
};
