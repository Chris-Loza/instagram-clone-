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
  useDisclosure,
} from "@chakra-ui/react";

const FollowersModal = ({ followersLength }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontSize={{ base: "xs", md: "sm" }}>
        <Button onClick={onOpen}>
          <Text as="span" fontWeight={"bold"} mr={1}>
            {followersLength}
          </Text>
          Followers
        </Button>
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
          <ModalHeader>Followers</ModalHeader>
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

export default FollowersModal;