import React, { useEffect, useState } from 'react';
import {
  VStack,
  Flex,
  Text,
  Card,
  CardBody,
  Box,
  Stack,
  StackDivider,
  IconButton,
  HStack,
  Button,
} from '@chakra-ui/react';
import { GrMail } from 'react-icons/gr';
import { GoCalendar } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import fetchApi from '../components/FetchCustom';

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('welfarePatrol-user');

  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const response = fetchApi(`/api/profile`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(json => {
            setUserProfile(json);
            console.log(json);
          });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate(`/`);
  };
  return (
    <>
      <Flex
        height="90vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing="4vh">
          <Flex height="10vh" width="100%">
            <Text as="b" fontSize="5vh">
              {userProfile?.name}
            </Text>
          </Flex>
          <Card>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <HStack spacing="10vh">
                    <Flex>
                      <IconButton
                        icon={<GrMail size="3vh" />}
                        style={{ background: 'white' }}
                      />
                      <Text pt="2" fontSize="md">
                        EMAIL
                      </Text>
                    </Flex>
                    <Text pt="2" fontSize="md">
                      {userProfile?.email}
                    </Text>
                  </HStack>
                </Box>
                <Box>
                  <HStack spacing="10vh">
                    <Flex>
                      <IconButton
                        icon={<GoCalendar size="3vh" />}
                        style={{ background: 'white' }}
                      />
                      <Text pt="2" fontSize="md">
                        JOINED ON
                      </Text>
                    </Flex>

                    <Text pt="2" fontSize="md">
                      {userProfile?.createdAt?.split('T')[0]}
                    </Text>
                  </HStack>
                </Box>
              </Stack>
            </CardBody>
          </Card>
          <Button colorScheme="teal" variant="solid" onClick={logout}>
            Sign Out
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Profile;
