import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Button, Image, Stack, Heading, Text } from '@chakra-ui/react'
import plantTree from '../assets/plantTree.svg'
import { Link } from 'react-router-dom'

const PlantATree = () => {
    const [address, setAddress] = useState({ lat: null, long: null });
    const [aqi, setAqi] = useState(null);

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        getAQI();
    }, [address]);

    let token = process.env.REACT_APP_AQI_TOKEN;

    const getLocationThroughIp = () => {
        const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.REACT_APP_IPGEO_TOKEN}`
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                setAddress({ lat: res.latitude, long: res.longitude });
            })
            .catch((err) => console.log(err));
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, altWay);
        }
        else {
            getLocationThroughIp();
        }
    }

    async function showPosition(position) {
        setAddress({ lat: position.coords.latitude, long: position.coords.longitude })
    }

    function altWay() {
        getLocationThroughIp();
    }

    const getAQI = () => {
        const url = `https://api.waqi.info/feed/geo:${address.lat};${address.long}/?token=${token}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className='flex flex-col md:flex-row mx-12 text-4xl gap-32 items-center'>
                <img src={plantTree} className="order-1 md:order-1 md:w-[30%] w-full" alt='Planting_tree' />
                <div className='flex flex-col gap-5 order-2 md:order-2'>
                    <p className='bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-red-600'>
                        Help reduce your area's carbon footprint and AQI by planting a tree.
                    </p>
                    <Link to='/plant'>
                        <Button variant='solid' size="lg" colorScheme='green'>
                            Plant Tree
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PlantATree