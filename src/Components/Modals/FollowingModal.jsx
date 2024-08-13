import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const FollowingModal = ({ followingLength }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontSize={{ base: "xs", md: "sm" }}>
        <Button bg={"transparent"} onClick={onOpen}>
          <Text as="span" fontWeight={"bold"} mr={1}>
            {followingLength}
          </Text>
          Following
        </Button>
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Following</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex
              mb={4}
              gap={4}
              flexDir={"column"}
              maxH={"250px"}
              overflowY={"auto"}
            >
              <Text>Hi</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowingModal;
