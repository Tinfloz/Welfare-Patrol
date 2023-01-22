import React from 'react';
import { Flex, Box, Card, Heading, Badge, Text, CardBody, Stack, Spinner, HStack } from "@chakra-ui/react";
import { useJsApiLoader, GoogleMap, Circle } from "@react-google-maps/api";
import { getDistance } from '../helpers/get.distance';
import { timeSince } from '../helpers/time.since';
import { useNavigate } from "react-router-dom";

const RequestCard = ({ userLocation, welfareRequest }) => {

    console.log(userLocation)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const navigate = useNavigate();

    const options = {
        strokeColor: '#00ab41',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#39e75f',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 250,
        zIndex: 1
    }

    return (
        <>
            <Box w="95vw" m={"1vw"} 
                borderColor={"#fff"}
            
            onClick={() => {
                navigate("/accept/request", { state: { welfareRequest, userLocation } })
            }}>
                {
                    !isLoaded ? (
                        <>
                            <Flex
                                justify="center"
                                alignItems="center"
                                h="50vh"
                            >
                                <Spinner
                                    speed="0.65s"
                                    color="blue.500"
                                    emptyColor='gray.300'
                                    size="xl"
                                    thickness='4px'
                                />
                            </Flex>
                        </>
                    ) : (
                        <>
                                <Flex
                                    position="relative"
                                >
                                    <GoogleMap
                                        center={{ lat: welfareRequest?.location?.coordinates[0], lng: welfareRequest?.location?.coordinates[1] }}
                                        zoom={15}
                                        mapContainerStyle={{ width: "100%", height: "25vh" }}
                                        options={{ mapTypeControl: false, zoomControl: false, streetViewControl: false, fullscreenControl: false }}
                                    >
                                        <Circle
                                            options={options}
                                            center={{ lat: welfareRequest?.location?.coordinates[0], lng: welfareRequest?.location?.coordinates[1] }}
                                        />
                                    </GoogleMap>
                                    <Flex
                                        position="absolute"
                                        zIndex="1"
                                        justify="flex-end"
                                        bottom="5"
                                        w="100%"
                                    >
                                        <Badge
                                            bg="white"
                                            fontSize="2vh"
                                            borderRadius="1vh"
                                            borderWidth="1px"
                                            borderColor="gray.500"
                                            marginRight={"2vw"}
                                        >
                                            {timeSince(welfareRequest?.createdAt.split("T")[0])}
                                        </Badge>
                                    </Flex>
                                </Flex>
                                <Stack mt='1vh' direction="column">
                                    <Flex
                                        justify="space-between"
                                        alignItems={"center"}
                                    >
                                        <Heading size='md'>{welfareRequest?.neighborhood}</Heading>
                                        <HStack spacing="3vh">
                                            <Text size="sm">
                                                {`${getDistance(userLocation.lat, userLocation.lon,
                                                    welfareRequest?.location?.coordinates[0], welfareRequest?.location?.coordinates[1]).toFixed(2)} KM`}
                                            </Text>
                                        </HStack>
                                    </Flex>
                                </Stack>
                        </>
                    )
                }
            </Box >
        </>
    )
}

export default RequestCard