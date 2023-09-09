import axios from "axios";

export const getCustomers = async () => {
  return await axios.get(
    `http://localhost:8080/api/v1/customers`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  );
};

export const saveCustomer = async (customer) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.post(
      `http://localhost:8080/api/v1/customers`,
      customer,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
      `http://localhost:8080/api/v1/customers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};

export const putCustomer = async (id, update) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return await axios.put(
      `http://localhost:8080/api/v1/customers/${id}`,
      update,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
  } catch (e) {
    throw e;
  }
};
