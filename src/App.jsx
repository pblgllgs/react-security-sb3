import { useEffect, useState } from "react";
import { Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";

import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "./auth/hooks/useAuth";
import SidebarWithHeader from "./customers/shared/sideBar";
import CardWithImage from "./customers/components/CustomerCard";
import CreateCustomerDrawer from "./customers/components/CreateCustomerDrawer";
import { loadingCustomers } from "./store/slice/customer/customerSlice";
import { getCustomers } from "./customers/services/customerService.js";
import { errorNotification } from "./utils/notification";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const fetchCustomers = () => {
    setLoading(true);
    getCustomers()
      .then((response) => {
        setCustomers(response.data);
        dispatch(loadingCustomers(response.data));
      })
      .catch((err) => {
        setError(err.response.data.message);
        errorNotification(err.code, err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    var { exp, sub } = jwt_decode(token);
    if (sub !== user.email || exp < (new Date().getTime() + 1) / 1000) {
      handleLogout();
    }
  }, []);

  if (loading) {
    return (
      <SidebarWithHeader>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </SidebarWithHeader>
    );
  }

  if (err) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>Oooops there was an error</Text>
      </SidebarWithHeader>
    );
  }

  if (customers.length <= 0) {
    return (
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Text mt={5}>No customers available</Text>
      </SidebarWithHeader>
    );
  }

  return (
    <>
      <SidebarWithHeader>
        <CreateCustomerDrawer fetchCustomers={fetchCustomers} />
        <Wrap justify={"center"} spacing={"30px"}>
          {customers.map((customer, index) => (
            <WrapItem key={index}>
              <CardWithImage
                {...customer}
                imageNumber={index}
                fetchCustomers={fetchCustomers}
              />
            </WrapItem>
          ))}
        </Wrap>
      </SidebarWithHeader>
    </>
  );
};

export default App;
