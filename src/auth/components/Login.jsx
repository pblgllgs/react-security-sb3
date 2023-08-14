import {
  Flex,
  Text,
  Stack,
  Box,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import FormLogin from "./FormLogin";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign in
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <FormLogin
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
