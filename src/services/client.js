import axios from "axios";

export const getCustomers = async () => {
  return await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const saveCustomer = async (customer) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
      customer,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const deleteCustomer = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const updateCustomer = async (id, update) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
      update,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};
