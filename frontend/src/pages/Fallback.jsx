import React from 'react';
import { Flex, Spinner } from "@chakra-ui/react";

const Fallback = () => {
    return (
        <>
            <Flex
                justify="center"
                alignItems="center"
                p="15vh"
            >
                <Spinner
                    speed='0.65s'
                    color='blue.500'
                    emptyColor='gray.300'
                    thickness='4px'
                    size="xl"
                />
            </Flex>
        </>
    )
}

export default Fallback