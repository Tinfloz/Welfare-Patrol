import React from 'react';
import { Flex, Tooltip, Text } from '@chakra-ui/react';

const TextMessage = ({ receive, text }) => {
    return (
        <>
            <Flex
                bg={!receive ? "blue.300" : "gray.200"}
                color={!receive ? "white" : "black"}
                justify="center"
                alignItems="center"
            >
                <Text>
                    {text}
                </Text>
            </Flex>
        </>
    )
}

export default TextMessage