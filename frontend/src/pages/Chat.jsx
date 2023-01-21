import React from 'react';
import { Flex, Heading, HStack, IconButton, Icon, Input } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { BsCircle, BsSearch } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSend } from "react-icons/fi"

const Chat = () => {
    return (
        <>
            <Flex
                justify="space-between"
                p="3vh"
                borderBottomWidth="1px"
                borderBottomColor="gray.400"
            >
                <HStack spacing="2vh">
                    <IconButton
                        aria-label='back'
                        icon={<IoIosArrowBack size="4vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                    <Heading
                        size="lg"
                    >
                        Dave H.
                    </Heading>
                    <Icon
                        as={BsCircle}
                        fill="green.200"
                        bg="green.200"
                        borderRadius="50%"
                    />
                </HStack>
                <HStack spacing="2vh">
                    <IconButton
                        icon={<BsSearch size="4vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                    <IconButton
                        icon={<AiOutlineMenu size="4vh" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                </HStack>
            </Flex>
            <Flex
                position="fixed"
                bottom="0"
                w="100%"
                justify={"center"}
                alignItems={"center"}
                p="4vh"
            >
                <HStack spacing="3vh">
                    <Input w="70vh" placeholder='Message' />
                    <IconButton
                        icon={<FiSend size="4vh" bg="gray.200" />}
                        bg="white"
                        _hover={{ bg: "white" }}
                    />
                </HStack>
            </Flex>
        </>
    )
}

export default Chat