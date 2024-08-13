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
import useGetFollowers from "../../hooks/useGetFollowers";
import Follower from "../FollowersAndFollowing/Follower";

const FollowersModal = ({ followersLength }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isLoading, followersList} = useGetFollowers();

  return (
    <>
      <Text fontSize={{ base: "xs", md: "sm" }}>
        <Button bg={"transparent"} onClick={onOpen}>
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
                {followersList.map((user) => (
                    <Follower user={user} key={user.id}/>
                ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowersModal;
