import React from 'react';
import Creds from '../components/Creds';
import { Flex } from "@chakra-ui/react";

const Login = () => {
  return (
    <>
      <Flex
        justify="center"
        alignItems="center"
        p="15vh"
      >
        <Creds register={false} />
      </Flex>
    </>
  );
};

export default Login;
