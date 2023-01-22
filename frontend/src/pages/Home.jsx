import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Heading, IconButton, VStack, Box, Spinner } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import RequestCard from '../components/RequestCard';
import fetchApi from "../components/FetchCustom";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const token = localStorage.getItem("welfarePatrol-user");
    const navigate = useNavigate();

    const getCenter = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        });
    };



    const [welfareRequest, setWelfareRequest] = useState(null);
    const [position, setPosition] = useState({
        lat: null,
        lon: null
    });

    const onClick = useCallback(() => {
        navigate("/accept/request", { state: welfareRequest })
    }, [welfareRequest])

    useEffect(() => {
        (async () => {
            const coords = await getCenter();
            setPosition(prevState => ({
                ...prevState,
                lat: coords.coords.latitude,
                lon: coords.coords.longitude
            }));
            fetchApi(`/api/welfare?coordinateA=${coords.coords.latitude}&coordinateB=${coords.coords.longitude}`,
                {
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).then(res => res.json()).then(json => {
                    if (json.welfareRequests) {
                        console.log(json.welfareRequests);
                        setWelfareRequest(json.welfareRequests);
                    } else {
                        console.error("could not call api")
                    }
                })
        })()
    }, [])

    return (
        <>
            {!welfareRequest ? (
                <>
                    <Flex
                        justify="center"
                        alignItems="center"
                        p="15vh"
                    >
                        <Spinner
                            speed="0.65s"
                            emptyColor='gray.300'
                            color='blue.500'
                            thickness='4px'
                            size="xl"
                        />
                    </Flex>
                </>
            ) : (
                <>
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
                            pb="20vh"
                        >
                            <VStack spacing="5vh">
                                {
                                    welfareRequest?.map(element => (
                                        <RequestCard
                                            welfareRequest={element}
                                            userLocation={position}
                                        />
                                    ))
                                }
                            </VStack>
                        </Flex>
                    </Box>
                </>
            )}
        </>
    )
}

export default Home