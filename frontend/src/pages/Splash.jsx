import React from 'react';
import { Flex, Text, VStack, Image } from '@chakra-ui/react';
import logo from '../assets/splash.svg';

const Splash = () => {
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="90vh"
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
    </>
  );
};

export default Splash;
