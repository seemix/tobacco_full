import React from 'react';

import './About.css';
import { Card } from '@mui/material';
import aboutImage from './2.webp'

const About = () => {
    return (
        <div style={{ marginTop: '70px' }}>
            <div className={'image_container'}
                 style={{ backgroundImage: `url(${aboutImage})` }}
            >
                <div className={'image_overlay'}></div>
                <h2>ABOUT US</h2>
            </div>
            <div className={'content_container'}>
                <div className={'content_wrapper'} style={{ marginTop: '50px' }}>
                    <Card style={{ padding: '20px' }}>
                        <div style={{ maxWidth: '500px' }}>
                            <big>
                                Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis.
                                Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo
                                eget
                                felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Lorem ipsum dolor sit

                            </big>
                            <p>
                                Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis.
                                Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo
                                eget
                                felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Pellentesque odio
                                nisi,
                                euismod in, pharetra a, ultricies in, diam.

                            </p>
                            <big>
                                Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis.
                                Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo
                                eget
                                felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Lorem ipsum dolor sit

                            </big>
                            <p>
                                Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis.
                                Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo
                                eget
                                felis facilisis fermentum. Morbi in sem quis dui placerat ornare. Pellentesque odio
                                nisi,
                                euismod in, pharetra a, ultricies in, diam.

                            </p>
                        </div>
                    </Card>
                    <div style={{
                        width: '500px',
                        backgroundImage: 'url(https://images.immediate.co.uk/production/volatile/sites/7/2019/10/141.GettyImages-509729312-e7567de-e1571218314945.jpg?resize=620,413)',
                        backgroundSize: 'cover',
                        height: '700px',
                        backgroundPosition: 'center'
                    }}
                    >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;