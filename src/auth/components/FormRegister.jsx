import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MyTextInput from "./MyTextInput";
import { registration } from "../services/authService";
import Swal from "sweetalert2";

const FormRegister = ({ setShowPassword, showPassword }) => {
  const navigate = useNavigate();
  const handleNavidateFormLogin = () => {
    navigate("/login");
  };
  return (
    <Formik
      validateOnMount={true}
      validationSchema={Yup.object({
        firstname: Yup.string()
          .max(20, "First name can not be more than 20 characters")
          .min(4, "First name can not be less than 4 characters")
          .required("First name is required"),
        lastname: Yup.string()
          .max(20, "Last name can not be more than 20 characters")
          .min(4, "Last name can not be less than 4 characters")
          .required("Last name is required"),
        email: Yup.string()
          .email("Must be a valid email")
          .required("Email is required"),
        password: Yup.string()
          .max(20, "Password can not be less than 20 characters")
          .required("Password is required"),
      })}
      initialValues={{
        firstname: "user",
        lastname: "user",
        email: "pbl.gllgs@gmail.com",
        password: "12345",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const response = await registration(values);
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/login")
        Swal.fire("Usuario registrado","El usuario fue registrado exitosamente","success")
      }}
    >
      {({ isValid, isSubmitting }) => {
        return (
          <Form>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstname" isRequired>
                    <MyTextInput
                      label={"First name"}
                      name={"firstname"}
                      type={"text"}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastname" isRequired>
                    <MyTextInput
                      label={"Last name"}
                      name={"lastname"}
                      type={"text"}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <MyTextInput label={"Email"} name={"email"} type={"email"} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
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
                  Sign up
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

FormRegister.propTypes = {
  setShowPassword: PropTypes.func,
  showPassword: PropTypes.any,
};

export default FormRegister;