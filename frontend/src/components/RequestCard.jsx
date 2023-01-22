import React from 'react';
import { Flex, Card, Heading, Badge, Text, CardBody, Stack, Spinner, HStack } from "@chakra-ui/react";
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
            <Card w="90vh" h="50vh" onClick={() => {
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
                            <CardBody>
                                <Flex
                                    position="relative"
                                >
                                    <GoogleMap
                                        center={{ lat: welfareRequest?.location?.coordinates[0], lng: welfareRequest?.location?.coordinates[1] }}
                                        zoom={15}
                                        mapContainerStyle={{ width: "100%", height: "40vh" }}
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
                                        ml="70vh"
                                        bottom="5"
                                    >
                                        <Badge
                                            bg="white"
                                            fontSize="2vh"
                                            borderRadius="1vh"
                                            borderWidth="1px"
                                            borderColor="gray.500"
                                        >
                                            {timeSince(welfareRequest?.createdAt.split("T")[0])}
                                        </Badge>
                                    </Flex>
                                </Flex>
                                <Stack mt='6' direction="column">
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Heading size='md'>{welfareRequest?.address}</Heading>
                                        <HStack spacing="3vh">
                                            <Heading size="md">
                                                {`${getDistance(userLocation.lat, userLocation.lon,
                                                    welfareRequest?.location?.coordinates[0], welfareRequest?.location?.coordinates[1]).toFixed(2)} KM`}
                                            </Heading>
                                        </HStack>
                                    </Flex>
                                </Stack>
                            </CardBody>
                        </>
                    )
                }
            </Card >
        </>
    )
}

export default RequestCard