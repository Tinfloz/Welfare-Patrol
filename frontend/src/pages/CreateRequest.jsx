import React from 'react';
import { Flex, VStack, Text, Box, Heading, Input, Button, Spinner } from '@chakra-ui/react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const CreateRequest = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

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
                            <Spinner />
                        </Flex>
                    </>
                ) : (
                    <>
                        {/* <VStack spacing="-0.19vh"> */}
                        <Box
                            h="60vh"
                            w="100%"
                            position="relative"
                        >
                            <GoogleMap
                                center={{ lat: 45.5307609, lng: -73.5526934 }}
                                zoom={15}
                                mapContainerStyle={{ width: "100%", height: "60vh" }}
                                options={{ mapTypeControl: false, zoomControl: false, streetViewControl: false, fullscreenControl: false }}
                            >
                                <Marker
                                    position={{ lat: 45.5307609, lng: -73.5526934 }}
                                />
                            </GoogleMap>
                        </Box>
                        <Box
                            h="39vh"
                            borderTop="gray.300"
                            borderTopWidth="1px"
                            borderTopColor="gray.300"
                            borderTopRadius="10vh"
                            w="100%"
                            justify="center"
                            alignItems="center"
                            zIndex="1"
                            position="absolute"
                        >
                            <VStack p="3vh" spacing="5vh">
                                <Flex
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Heading size="md">
                                        Montreal , QC
                                    </Heading>
                                </Flex>
                                <Input type="text" placeholder="Type address" w="40vh" />
                                <Button
                                    w="50vh"
                                    borderRadius="2vh"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    style={{ background: "#F8D9D2" }}
                                    color="white"
                                >
                                    CREATE REQUEST
                                </Button>
                            </VStack>
                        </Box>
                        {/* </VStack> */}
                    </>
                )
            }
        </>
    )
}

export default CreateRequest