import React from "react";
import { Carousel } from "react-bootstrap";
import Container from 'react-bootstrap/Container';

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
            
            <Container className="body-render">
                <h1>Hello!</h1>
            </Container>
        </div>
    );
}

export default Home;