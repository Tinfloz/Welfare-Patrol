import React, { useState, useCallback } from 'react';
import { VStack, Input, Flex, Image, Box } from '@chakra-ui/react';
import home from '../assets/house.svg';
import location from '../assets/location.svg';
import fetchApi from "../components/FetchCustom";

import ButtonComponent from './ButtonComponent';
import { useNavigate } from 'react-router-dom';

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
      const URL = register
        ? "/api/signUp" : "/api/signIn";
        fetchApi(URL, {
          method: "post",
          body: JSON.stringify({email: user.email, password: user.password}),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((json) => {
          if (json.token){

            localStorage.setItem('welfarePatrol-user', json.token);
            navigate(`/home`);
          } else {
            console.error("Failed!");
          }
        })
        .catch((err) => {
          console.log(err);
        });

    } catch (error) {
      console.error(error);
    }
  }, [register, user, navigate]);

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
