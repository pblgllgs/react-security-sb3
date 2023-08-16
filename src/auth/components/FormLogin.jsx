import PropTypes from "prop-types";
import {
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { successNotification } from "../../utils/notification";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { validarEmail } from '../../utils/emailValidation';

const FormLogin = ({ showPassword, setShowPassword }) => {
  const { handlerLogin } = useAuth();
  const navigate = useNavigate();
  const handleNavidateFormLogin = () => {
    navigate("/register");
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const user = await handlerLogin(values);
        navigate("/dashboard");
        successNotification(
          "Ingreso exitoso",
          `Usuario ${user.firstName} was successfully login`
        );
      }}
    >
      {({ isValid, isSubmitting, errors, touched }) => {
        return (
          <Form>
            <Stack spacing={6}>
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
