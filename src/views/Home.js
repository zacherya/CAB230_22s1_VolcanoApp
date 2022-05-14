import React from "react";
import { Carousel } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import WhatIsVolcano from "../components/WhatIsVolcano";
import SiteLogo from '../assets/images/sitelogo.png';
import VolcanoVocab from "../components/VolcanoVocab";

function Home() {
    return (
        <div className="body-render">
            <div className="header-carousel">
                <Carousel >
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://static.tildacdn.com/tild6434-6330-4435-b035-623435303063/noroot.jpg"
                        alt="SemeruVolcano"
                        />
                        <Carousel.Caption>
                        <h3>Semeru</h3>
                        <p>Indonesia</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://primaryleap.co.uk/images/wikileap/post_levels/thumb_orignal/583815f42b8ddefb1bb5df89a98982b6e89c59ba3S.jpg"
                        alt="MountGalerasVolcano"
                        />

                        <Carousel.Caption>
                        <h3>Mount Galeras</h3>
                        <p>Columbia</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://specials-images.forbesimg.com/imageserve/60709c230305bcd6c8eadafc/960x0.jpg?fit=scale"
                        alt="TatunVolcano"
                        />

                        <Carousel.Caption>
                        <h3>Tatun</h3>
                        <p>Taiwan</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            
            <Container>
                <Row className="mb-5">
                    <div className="d-flex site-branding">
                        <img
                                src={SiteLogo}
                                width="45"
                                height="45"
                                className="d-inline-block align-top"
                                alt="Volcano Logo"
                            />
                            <h1 className="site-title">Volcanoes</h1>
                    </div>
                    <h6><i>A volcano is an opening in a planet or moon’s crust through which molten rock and gases trapped under the surface erupt, often forming a hill or mountain.</i></h6>
                </Row>
                <Row>
                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                        <ListGroup className="w-100">
                            <ListGroup.Item action href="#link1">
                            What is a Volcano?
                            </ListGroup.Item>
                            <ListGroup.Item action href="#link2">
                            Volcano Vocabulary
                            </ListGroup.Item>
                        </ListGroup>
                        </Col>

                        <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="#link1">
                                <WhatIsVolcano />
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                                <VolcanoVocab />
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </Row>
            </Container>
        </div>
    );
}

export default Home;