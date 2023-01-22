import React from 'react';
import { Flex, Text, VStack, Image, Button } from '@chakra-ui/react';
import logo from '../assets/splash.svg';
import { useNavigate } from 'react-router-dom';
const Splash = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate(`/login`);
  };
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="85vh"
        width="100%"
      >
        <VStack spacing="2vh">
          <Image src={logo} w="50vh" />
          <Flex width="60%">
            <Text fontSize="5vh">
              Ensuring the safety and well-being of the people you care about
            </Text>
          </Flex>
        </VStack>
      </Flex>
      <Text mb="2vh">Terms and privacy policy</Text>
      <Button colorScheme="teal" variant="solid" onClick={navigateToLogin}>
        GET STARTED
      </Button>
    </>
  );
};

export default Splash;
