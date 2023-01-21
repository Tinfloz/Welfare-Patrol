import React from 'react';
import Creds from '../components/Creds';
import { Flex } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <>
      <Flex
        justify="center"
        alignItems="center"
        p="15vh"
      >
        <Creds register={true} />
      </Flex>
    </>
  );
};

export default SignUp;
