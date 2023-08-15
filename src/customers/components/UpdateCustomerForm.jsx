/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Formik, Form, useField, Field } from "formik";
import * as Yup from "yup";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { updateCustomer } from "../../services/client.js";
import Swal from "sweetalert2";

const values = ["MALE", "FEMALE"];

// eslint-disable-next-line react/prop-types
const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      {/* eslint-disable-next-line react/prop-types */}
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Alert className="error" status={"error"} mt={2}>
          <AlertIcon />
          {meta.error}
        </Alert>
      ) : null}
    </Box>
  );
};

// And now we can use these
// eslint-disable-next-line react/prop-types, no-unused-vars
const UpdateCustomerForm = ({fetchCustomers,initialValues,custumerId,onClose,}) => {
  return (
    <>
      <Formik
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, "Must be 15 characters or less")
            .required("Required"),
          gender: Yup.string()
            .max(6, "Must be 20 characters or less")
            .min(4, "Must be 4 characters or more")
            .required("Required"),
          age: Yup.number()
            .min(1, "Must be a least 16 years of age")
            .max(100, "Must be a less than 100 years of age")
            .required("Required"),
        })}
        initialValues={initialValues}
        onSubmit={async (updatedCostumer, { setSubmitting }) => {
          setSubmitting(true);
          await updateCustomer(custumerId, updatedCostumer);
          Swal.fire("Updated", "Updated successfully", "success");
          fetchCustomers();
          setSubmitting(false);
          onClose();
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <Stack spacing={"24px"}>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Jane"
              />
              <MyTextInput
                label="Gender"
                name="gender"
                type="text"
                placeholder="MALE"
              />
              <MyTextInput
                label="Age"
                name="age"
                type="text"
                placeholder="20"
              />
              <Button
                disabled={!(isValid && dirty) || isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UpdateCustomerForm;
