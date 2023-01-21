import React, { useEffect, useState } from 'react';
import { Flex, Heading, IconButton, VStack, Box } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import RequestCard from '../components/RequestCard';

const Home = () => {

    const getCenter = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
    };


    useEffect(() => {
        (async () => {
            const coords = await getCenter();
            const response = await axios.get()
        })()
    }, [])

    return (
        <Box
            p="5vh"
        >
            <Flex
                justify="center"
                alignItems="center"
            >
                <Heading
                    size='md'
                >
                    Montreal, QC
                </Heading>
            </Flex>
            <Flex
                justify="space-between"
                p="5vh"
            >
                <Heading
                    size='md'
                >
                    Welfare Requests
                </Heading>
                <IconButton
                    aria-label='add-request'
                    icon={<IoMdAdd style={{ size: "5vh" }} />}
                    bg="white"
                    _hover={{ bg: "white" }}
                />
            </Flex>
            <Flex
                justify="center"
                alignItems="center"
            >
                <VStack spacing="5vh">
                    <RequestCard />
                    <RequestCard />
                    <RequestCard />
                </VStack>
            </Flex>
        </Box>
    )
}

export default Home