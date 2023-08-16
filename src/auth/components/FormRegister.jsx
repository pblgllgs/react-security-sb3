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
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import MyTextInput from "./MyTextInput";
import { registration } from "../services/authService";
import Swal from "sweetalert2";
import { validarEmail } from "../../utils/emailValidation";

const FormRegister = ({ setShowPassword, showPassword }) => {
  const navigate = useNavigate();
  const handleNavidateFormLogin = () => {
    navigate("/login");
  };
  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("🚀 ~ file: FormRegister.jsx:53 ~ onSubmit={ ~ values:", values)
        setSubmitting(true);
        const response = await registration(values);
        const data = response.data;
        localStorage.setItem("token", data.token);
        navigate("/login")
        Swal.fire("Usuario registrado","El usuario fue registrado exitosamente","success")
      }}
    >
      {({ isValid, isSubmitting, errors, touched }) => {
        return (
          <Form>
            <Stack spacing={4}>
              <HStack>
                <Box>
                <FormControl isInvalid={!!errors.firstname && touched.firstname}>
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Field
                  as={Input}
                  id="firstname"
                  name="firstname"
                  type="text"
                  variant="filled"
                  validate={(value) => {
                    let error;

                    if (value.length < 2) {
                      error = "Nombre debe tener al menos 2 caracteres";
                    }
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.firstname}</FormErrorMessage>
              </FormControl>
                </Box>
                <Box>
                <FormControl isInvalid={!!errors.lastname && touched.lastname}>
                <FormLabel htmlFor="password">Last Name</FormLabel>
                <Field
                  as={Input}
                  id="lastname"
                  name="lastname"
                  type="text"
                  variant="filled"
                  validate={(value) => {
                    let error;

                    if (value.length < 2) {
                      error = "Password debe tener al menos 2 caracteres";
                    }
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.lastname}</FormErrorMessage>
              </FormControl>
                </Box>
              </HStack>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="password">Email</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="text"
                  variant="filled"
                  validate={(value) => {
                    let error;

                    if (!validarEmail(value)) {
                      error = "El formato del email no es correcto";
                    }
                    return error;
                  }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    variant="filled"
                    validate={(value) => {
                      let error;

                      if (value.length < 5) {
                        error = "Password debe tener al menos 5 caracteres";
                      }

                      return error;
                    }}
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
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