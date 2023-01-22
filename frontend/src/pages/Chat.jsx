import React  from 'react';
import {useLocation} from 'react-router-dom';
import { Flex, Heading, HStack, IconButton, Icon, Input, Text } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillCircleFill, BsSearch } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSend } from "react-icons/fi"
import TextMessage from '../components/TextMessage';

const Chat = () => {
    const {state} = useLocation();
    const {name, messages, chatId, userId} = state;
    console.log(userId);
    console.log(messages);
    return (
        <>
            <Flex
                justify="space-between"
                p="3vh"
                borderBottomWidth="1px"
                borderBottomColor="gray.400"
            >
                <HStack spacing="2vh" >
                    <IconButton
                        aria-label='back'
                        icon={<IoIosArrowBack size="4vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                    <Heading
                        size="lg"
                    >
                        {name}
                    </Heading>
                    <Icon
                        as={BsFillCircleFill}
                        fill="green.200"
                        bg="green.200"
                        borderRadius="50%"
                        fontSize={"1vh"}
                    />
                </HStack>
                <HStack spacing="2vh">
                    <IconButton
                        icon={<BsSearch size="3vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                    <IconButton
                        icon={<AiOutlineMenu size="3vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                </HStack>
            </Flex>
            {/* TODO: fix scroll */}
            <Flex className='chat' height={"80vh"} overflow="scroll">
                {
                    messages ?
                    messages.map((message, id)=>{
                        return (
                        <TextMessage key={id} receive={userId !== message.sender} text={message.content} />
                        )
                    })
                    : 
                    <Text>No messages</Text>
                }

            </Flex>
            <Flex
                position="fixed"
                bottom="0"
                w="100vw"
                justify={"center"}
                alignItems={"center"}
                p="1vh"
            >
                <HStack spacing="3vh" w="100%" >
                    <Input placeholder='Type your message' />
                    <IconButton
                        icon={<FiSend size="3.5vh" bg="gray.200" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                        style={{margin: "0"}}
                    />
                </HStack>
            </Flex>
        </>
    )
}

export default Chat