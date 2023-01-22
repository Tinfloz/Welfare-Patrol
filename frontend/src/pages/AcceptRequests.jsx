import React from 'react';
import { Box, VStack, Flex, Spinner, Heading, Text, Divider, Button } from "@chakra-ui/react";
import { useJsApiLoader, GoogleMap, Circle } from '@react-google-maps/api';
import AcceptRequestCard from '../components/AcceptRequestCard';
import { useLocation } from 'react-router-dom';

const AcceptRequests = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const { state } = useLocation();
    console.log(state)

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
    };

    return (
        <>
            {
                !isLoaded ? (
                    <>
                        <Flex
                            justify="center"
                            alignItems="Center"
                            p="20vh"
                        >
                            <Spinner
                                speed="0.65s"
                                thickness='4px'
                                color='blue.500'
                                emptyColor='gray.300'
                                size="xl"
                            />
                        </Flex>
                    </>
                ) : (
                    <>
                        <VStack
                            spacing="-10vh">
                            <Box
                                w="100%"
                                h="60vh"
                            >
                                <GoogleMap
                                    center={{ lat: state?.location?.coordinates[0], lng: state?.location?.coordinates[1] }}
                                    zoom={15}
                                    mapContainerStyle={{ width: "100%", height: "60vh" }}
                                    options={{ mapTypeControl: false, zoomControl: false, streetViewControl: false, fullscreenControl: false, zIndex: "0" }}
                                >
                                    <Circle
                                        options={options}
                                        center={{ lat: state?.location?.coordinates[0], lng: state?.location?.coordinates[1] }}
                                    />
                                </GoogleMap>
                            </Box>
                            <Box
                                w="100%"
                                h="30vh"
                                borderTopWidth="1px"
                                borderTopColor="gray.300"
                                borderTopRadius="10vh"
                                zIndex="1"
                            >
                                <Flex
                                    justify="center"
                                    alignItems="center"
                                    p="3vh"
                                >
                                    <Heading
                                        size="md"
                                    >
                                        Villemarie, QC
                                    </Heading>
                                </Flex>
                                <Box
                                    borderTopWidth="1px"
                                    borderBottomWidth="1px"
                                    borderTopColor="gray.300"
                                    borderBottomColor="gray.300"
                                >
                                    <AcceptRequestCard posted={true} welfareRequest={state} />
                                    <Divider />
                                    <AcceptRequestCard posted={false} duration={true} welfareRequest={state} />
                                    <Divider />
                                    <AcceptRequestCard posted={false} duration={false} welfareRequest={state} />
                                </Box>
                                <Button
                                    w="50vh"
                                    borderRadius="2vh"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    style={{ background: "#F8D9D2" }}
                                    color="white"
                                    mt="5vh"
                                >
                                    Accept
                                </Button>
                            </Box>
                        </VStack>
                    </>
                )
            }
        </>
    )
}

export default AcceptRequests