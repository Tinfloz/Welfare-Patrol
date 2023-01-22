import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  IconButton,
  VStack,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import RequestCard from '../components/RequestCard';
import fetchApi from '../components/FetchCustom';

const Home = () => {
  const token = localStorage.getItem('welfarePatrol-user');
  console.log(token);

  const getCenter = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const [welfareRequest, setWelfareRequest] = useState(null);

  useEffect(() => {
    (async () => {
      const coords = await getCenter();
      try {
        const response = await fetchApi(
          `/api/welfare?coordinateA=${coords.coords.latitude}&coordinateB=${coords.coords.longitude}`,
          {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setWelfareRequest(response.data.welfareRequest);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {!welfareRequest ? (
        <>
          <Flex justify="center" alignItems="center" p="15vh">
            <Spinner
              speed="0.65s"
              emptyColor="gray.300"
              color="blue.500"
              thickness="4px"
              size="xl"
            />
          </Flex>
        </>
      ) : (
        <>
          <Box p="5vh">
            <Flex justify="center" alignItems="center">
              <Heading size="md">Montreal, QC</Heading>
            </Flex>
            <Flex justify="space-between" p="5vh">
              <Heading size="md">Welfare Requests</Heading>
              <IconButton
                aria-label="add-request"
                icon={<IoMdAdd style={{ size: '5vh' }} />}
                bg="white"
                _hover={{ bg: 'white' }}
              />
            </Flex>
            <Flex justify="center" alignItems="center">
              <VStack spacing="5vh">
                <RequestCard />
                <RequestCard />
                <RequestCard />
              </VStack>
            </Flex>
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
