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

const CreateRequest = () => {
    const token = localStorage.getItem('welfarePatrol-user');
    console.log(token);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [location, setLocation] = useState(state);
    const [address, setAddress] = useState("");
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        id: 'google-map-script',
        libraries: ['places'],
    });

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
                        <VStack
                            spacing="-5vh">
                    <Box h="60vh" w="100%" >
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
                                w="100vw"
                                h="10vh"
                                zIndex="1"
                                borderTopWidth="1px"
                                borderBottomWidth="1px"
                                justify="center"
                                alignItems="center"
                                p="1vh"
                                backgroundColor={"#fff"}
                                borderTopRadius="7vh"
                                borderBottomColor={"#fff"}
                            >
                       
                                       <Heading
                                        size="md"
                                        my="2vw"
                                    >
                                        {"Montreal, Quebec"}
                                    </Heading>
                                    
                                <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                                style={{ width: '80vh', height: "5vh", borderWidth: "1px", borderColor: "gray.300", padding: "2vh", borderRadius: "1vh", marginTop: "5vh"}}
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
                                <Button
                                    w="80vw"
                                    borderRadius="2vh"
                                    borderWidth="1px"
                                    borderColor="gray.300"
                                    style={{ background: "#F8D9D2" }}
                                    mt="5vh"
                                    size={"lg"}
                                    onClick={onClick}
                                >
                                    CREATE REQUEST
                                </Button>
                            </Box>
                            </VStack>
             
                </>
            )}
        </>
    );
};

export default CreateRequest;
