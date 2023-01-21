import React from 'react';
import {
  VStack,
  Flex,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiCheckDouble } from 'react-icons/bi';

const Messages = () => {
  return (
    <>
      <Flex height="90vh" width="100%" justifyContent="center" mt="10vh">
        <VStack spacing="3vh" align="stretch">
          <Text as="b" fontSize="3vh">
            Messages
          </Text>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch bg="white" />}
            />
            <Input type="text" placeholder="Search" />
          </InputGroup>
          <Divider orientation="horizontal" />
          <Flex>
            <Text as="b" fontSize="2vh">
              Dave Howard
            </Text>
            <Text fontSize="2vh" marginLeft="20vh">
              9:28 PM
            </Text>
          </Flex>
          <Flex>
            <IconButton
              icon={<BiCheckDouble size="3vh" />}
              style={{ background: 'white', paddingBottom: '15px' }}
            />
            <Text fontSize="2vh">I can drop in about 30 minutes</Text>
          </Flex>
          <Divider orientation="horizontal" />
          <Flex>
            <Text as="b" fontSize="2vh">
              John Kelly
            </Text>
            <Text fontSize="2vh" marginLeft="20vh">
              Jan 02
            </Text>
          </Flex>
          <Flex>
            <Text fontSize="2vh">Thank you so much she just called...</Text>
          </Flex>
          <Divider orientation="horizontal" />
        </VStack>
      </Flex>
    </>
  );
};

export default Messages;
