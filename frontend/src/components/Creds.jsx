import React, { useState, useCallback } from 'react';
import {
  VStack,
  Input,
  Flex,
  Image,
  Box,
} from '@chakra-ui/react';
import home from '../assests/house.svg';
import location from '../assests/location.svg';
import ButtonComponent from './ButtonComponent';

const Creds = ({ register }) => {

  const onClick = useCallback(() => {
    // call api
  }, [register])

  return (
    <>
      <Box
        w="50vh"
        h="50vh"
      >
        <Flex
          justify="center"
          alignItems="center"
        >
          <VStack spacing={register ? "3vh" : "4vh"}>
            <Image
              src={register ? (location) : (home)}
              alt="register"
              w="4ovh"
              h="auto"
            />
            {
              register ? (
                <>
                  <Input placeholder='name' />
                  <Input placeholder="email" />
                  <Input placeholder="password" />
                  <Input placeholder='confirm password' />
                </>
              ) : (
                <>
                  <Input placeholder="email" />
                  <Input placeholder="password" />
                </>
              )
            }
            <ButtonComponent register={register ? true : false} handleClick={onClick} />
          </VStack>
        </Flex>
      </Box>
    </>
  );
};

export default Creds;


