import React from 'react';
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

const Profile = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('welfarePatrol-user');
    localStorage.removeItem('address');
    localStorage.removeItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('user');
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
              Dave Howard
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
                      daveh@gmail.com
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
                      01/22/2023
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
