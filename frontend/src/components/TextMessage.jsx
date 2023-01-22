import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import "../assets/bubble.css";

const TextMessage = ({ receive, text, time }) => {
    return (
        // TODO: time on bubbles (data-time)
        <>
            <Flex
                bg={!receive ? "blue.300" : "gray.200"}
                color={!receive ? "white" : "black"}
                justify="left"
                alignItems="center"
                maxWidth={"30vw"}
                minH="1vh"
                className={receive ? "msg rcvd" : "msg sent"}
            >
                <Text>
                    {text}
                </Text>
            </Flex>
        </>
    )
}

export default TextMessage