import React from 'react';
import { Flex, Heading, IconButton, VStack } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

const Home = () => {
    return (
        <>
            <VStack>
                <Flex
                    justify="center"
                    alignItems="center"
                    p="4vh"
                >
                    <Heading
                        size='md'
                    >
                        Montreal, QC
                    </Heading>
                </Flex>
                <Flex
                    p="5vh"
                    justify="space-between"
                >
                    <Heading
                        size='md'
                    >
                        Welfare Requests
                    </Heading>
                    <IconButton
                        aria-label='add-request'
                        icon={<AiOutlinePlus style={{ size: "1vh" }} />}
                    />
                </Flex>
            </VStack>
        </>
    )
}

export default Home