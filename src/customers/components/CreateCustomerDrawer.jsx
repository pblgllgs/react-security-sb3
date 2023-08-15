import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CreateCustomerFormFull from "./CreateCustomerFormFull.jsx";
import { useState } from "react";

const AddIcon = () => "+";
const CloseIcon = () => "X";

// eslint-disable-next-line react/prop-types
const CreateCustomerDrawer = ({ fetchCustomers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Button leftIcon={<AddIcon />} onClick={onOpen} colorScheme={"blue"}>
        Create Customer
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new customer</DrawerHeader>

          <DrawerBody>
            <CreateCustomerFormFull
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              fetchCustomers={fetchCustomers}
              onClose={onClose}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button
              leftIcon={<CloseIcon />}
              onClick={onClose}
              colorScheme={"blue"}
            >
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateCustomerDrawer;
