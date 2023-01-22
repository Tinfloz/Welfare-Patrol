import React, { useState, useCallback } from 'react';
import { VStack, Input, Flex, Image, Box } from '@chakra-ui/react';
import home from '../assests/house.svg';
import location from '../assests/location.svg';

import ButtonComponent from './ButtonComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Creds = ({ register }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = e => {
    setUser(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onClick = useCallback(async () => {
    // call api
    try {
      const response = register
        ? await axios.post('/api/signUp', user)
        : axios.post('/signIn', user);
      console.log(response.data);
      if (response) {
        localStorage.setItem('user', response.data.token);
        navigate(`/home`);
      }
    } catch (error) {
      console.error(error);
    }
  }, [register]);

  return (
    <>
      <Box w="50vh" h="50vh">
        <Flex justify="center" alignItems="center">
          <VStack spacing={register ? '3vh' : '4vh'}>
            <Image
              src={register ? location : home}
              alt="register"
              w="40vh"
              h="auto"
            />
            {register ? (
              <>
                <Input
                  placeholder="name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
                <Input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <Input
                  placeholder="confirm password"
                  type="password"
                  name="confirmPassword"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <Input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </>
            )}
            <ButtonComponent
              register={register ? true : false}
              handleClick={onClick}
            />
          </VStack>
        </Flex>
      </Box>
    </>
  );
};

export default Creds;
