import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Heading, IconButton, VStack, Box, Spinner } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

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
                <VStack p={"3vw"} mt={"1vh"} w={"100vw"}>
                   
                        <Flex
                            justify="center"
                            alignItems="center"
                        >
                            <Heading
                                size='xs'
                            >
                                Montreal, QC
                            </Heading>
                            <IconButton
                                        icon={<FiChevronDown size="2.5vh" style={{ fill: "white" }} />}
                                        style={{ background: "#fff" }}
                                    />
                        </Flex>
                        <Flex
                            justify="space-between"
                            w="100%"
                            alignItems={"center"}
                        >
                            <Heading
                                size='lg'
                            >
                                Welfare Requests
                            </Heading>
                            <IconButton
                                aria-label='add-request'
                                icon={<AiOutlinePlus  size="3vh" />}
                                bg="white"
                                _hover={{ bg: "white" }}
                            />
                        </Flex>
              
                            <VStack spacing="3vh">
                                {
                                    welfareRequest?.map((element, id) => (
                                        <RequestCard
                                            key={id}
                                            welfareRequest={element}
                                            userLocation={position}
                                            position={position}
                                        />
                                    ))
                                }
                            </VStack>
                </VStack>
            )}
        </>
    )
}

export default Home;