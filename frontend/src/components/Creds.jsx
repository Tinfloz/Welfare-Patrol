import React, { useState } from 'react';
import {
  VStack,
  Input,
  Flex,
  Text,
  Image,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import home from '../assests/house.svg';
import location from '../assests/location.svg';

const Creds = ({ register }) => {
  return (
    <>
      <Flex justify="center" height="90vh" width="100%">
        <Flex justify="center" mt="10vh">
          <VStack spacing="4vh">
            {register ? (
              <VStack spacing="4vh">
                <Image src={location} w="50vh" />
                <Flex width="60%" justifyContent="center">
                  <Text fontSize="5vh">Create an account</Text>
                </Flex>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                  <FormLabel mt="2vh">Email address</FormLabel>
                  <Input type="email" />
                  <FormLabel mt="2vh">Password</FormLabel>
                  <Input type="password" />
                  <FormLabel mt="2vh">Confirm Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </VStack>
            ) : (
              <VStack spacing="4vh">
                <Image src={home} w="50vh" />
                <Flex width="60%" justifyContent="center">
                  <Text fontSize="5vh">Sign In</Text>
                </Flex>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormLabel mt="5vh">Password</FormLabel>
                  <Input type="password" />
                </FormControl>
              </VStack>
            )}
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};

export default Creds;
