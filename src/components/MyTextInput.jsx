import { Alert, AlertIcon, Box, FormLabel, Input } from "@chakra-ui/react";
import { useField } from "formik";

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

  export default MyTextInput;