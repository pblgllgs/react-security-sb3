import PropTypes from "prop-types";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SmallCloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCustomer } from "../hooks/useCustomer";
import { successNotification } from "../../utils/notification";

// eslint-disable-next-line no-unused-vars
export default function CreateCustomerFormFull({
  fetchCustomers,
  onClose,
  showPassword,
  setShowPassword,
}) {
  const { handlerAddCustomer } = useCustomer();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const content = {
      name,
      gender,
      age,
      email,
      password,
    };
    await handlerAddCustomer(content);
    onClose();
    fetchCustomers();
    successNotification("Customer Created", `Customer ${name} was successfully created`);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              placeholder="***********"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="gender" isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Select option"
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </Select>
        </FormControl>
        <FormControl id="age" isRequired>
          <FormLabel>Age</FormLabel>
          <NumberInput
            defaultValue={18}
            value={age}
            min={1}
            max={99}
            onChange={(valueString) => setAge(parseInt(valueString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
CreateCustomerFormFull.propTypes = {
  custumerId: PropTypes.any,
  fetchCustomers: PropTypes.any,
  onClose: PropTypes.func,
  setShowPassword: PropTypes.func,
  showPassword: PropTypes.bool,
};
