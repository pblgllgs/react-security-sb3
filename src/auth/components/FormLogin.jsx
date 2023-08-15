import PropTypes from "prop-types";
import {
  Text,
  Stack,
  FormLabel,
  Input,
  Button,
  FormControl,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import MyTextInput from "./MyTextInput";
// import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const FormLogin = ({ setShowPassword, showPassword }) => {
  const { handlerLogin } = useAuth();
  const navigate = useNavigate();
  const handleNavidateFormLogin = () => {
    navigate("/register");
  };
  return (
    <Formik
      validateOnMount={true}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
        password: Yup.string()
          .max(20, "Password can not be less than 20 characters")
          .required("Password is required"),
      })}
      initialValues={{
        email: "pbl.gllgs@gmail.com",
        password: "12345",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handlerLogin(values);
        navigate("/dashboard");
      }}
    >
      {({ isValid, isSubmitting }) => {
        return (
          <Form>
            <Stack spacing={6}>
              <FormControl id="email" isRequired>
                <MyTextInput label={"Email"} name={"email"} type={"email"} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    defaultValue={"12345"}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  <span>
                    Already a user?{" "}
                    <a onClick={handleNavidateFormLogin}>aqui</a>
                  </span>
                </Text>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;

FormLogin.propTypes = {
  setShowPassword: PropTypes.func,
  showPassword: PropTypes.any,
};
