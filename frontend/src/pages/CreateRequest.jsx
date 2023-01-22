import React, { useState } from 'react';
import {
    Flex,
    VStack,
    Text,
    Box,
    Heading,
    Input,
    Button,
    Spinner,
} from '@chakra-ui/react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';
import fetchApi from '../components/FetchCustom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const CreateRequest = () => {
    const token = localStorage.getItem('welfarePatrol-user');
    console.log(token);
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state)
    const [location, setLocation] = useState({
        lat: state.position.lat,
        lng: state.position.lon
    });
    const [myLocation, setMyLocation] = useState("")
    const [address, setAddress] = useState("");
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        id: 'google-map-script',
        libraries: ['places'],
    });

    useEffect(() => {
        (() => {
            fetchApi(`/api/reverseGeocode?coordinateA=${location.lat}&coordinateB=${location.lng}`, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }).then(res => res.json()).then(
                json => {
                    setMyLocation(json.address)
                }
            )
        })()
    }, [])

    const onClick = () => {
        fetchApi("/api/welfare/", {
            method: "post",
            body: JSON.stringify({ address, coordinateA: location.lat, coordinateB: location.lng }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json()).then(json => {
            if (json.message === "Success") {
                navigate("/home");
            } else {
                console.log("API Failed!")
            }
        });
    };

    return (
        <>
            {!isLoaded ? (
                <>
                    <Flex justify="center" alignItems="Center" p="20vh">
                        <Spinner
                            speed="0.65s"
                            thickness="4px"
                            color="blue.500"
                            emptyColor="gray.300"
                            size="xl"
                        />
                    </Flex>
                </>
            ) : (
                <>
                    {/* <VStack spacing="-10vh"> */}
                    <Box h="60vh" w="100%" position="relative" zIndex="-10">
                        <GoogleMap
                            center={location}
                            zoom={15}
                            mapContainerStyle={{ width: '100%', height: '60vh' }}
                            options={{
                                mapTypeControl: false,
                                zoomControl: false,
                                streetViewControl: false,
                                fullscreenControl: false,
                            }}
                        >
                            <Marker position={location} />
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
                    >
                        <VStack p="3vh" spacing="5vh">
                            <Flex justify="center" alignItems="center">
                                <Heading size="md">{myLocation}</Heading>
                            </Flex>
                            <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                style={{ width: '50vh', height: "5vh", borderWidth: "1px", borderColor: "gray.300", padding: "2vh", borderRadius: "1vh" }}
                                onPlaceSelected={place => {
                                    setLocation(prevState => ({
                                        ...prevState,
                                        lat: place?.geometry?.location?.lat(),
                                        lng: place?.geometry?.location?.lng()
                                    }));
                                    setAddress(place?.formatted_address);
                                }}
                                options={{
                                    types: ["geocode", "establishment"],
                                }}
                            />
                            ;
                            <Button
                                w="50vh"
                                borderRadius="2vh"
                                borderWidth="1px"
                                borderColor="gray.300"
                                style={{ background: '#F8D9D2' }}
                                onClick={onClick}
                                color="white"
                            >
                                CREATE REQUEST
                            </Button>
                        </VStack>
                    </Box>
                    {/* </VStack> */}
                </>
            )}
        </>
    );
};

export default CreateRequest;
