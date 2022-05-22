import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Nav,
  Button,
  Card,
  Placeholder,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";
import SiteLogo from "../assets/images/sitelogo.png";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthConsumer } from "../services/AuthProvider";
import Endpoints from "../helpers/Endpoints";
import DataService from "../services/DataRequestService";
import { ChevronLeft } from "react-bootstrap-icons";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const VolcanoSpecificEp = Endpoints().volcanoes();

const dataService = new DataService();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function VolcanoView() {
  const { id } = useParams();

  const [volcanoData, setVolcanoData] = useState();

  const [error, setError] = useState(null);

  const consumer = useContext(AuthConsumer);

  const navigate = useNavigate();

  const preFetch = useEffect(() => {
    return () => {
      setTimeout(() => {
        fetchVolcano(id)
          .then((req) => {
            if (req.status === 400) {
              navigate(`../`, { replace: true });
              return;
            }
            return req.json();
          })
          .then((data) => {
            setVolcanoData(data);
          })
          .catch((error) => {
            setError(error.message);
          });
      }, 1000);
    };
  }, []);

  const fetchOnAuthStateChange = useEffect(() => {
    if (consumer.authenticated) setVolcanoData(undefined);

    setTimeout(() => {
      fetchVolcano(id)
        .then((req) => {
          if (req.status === 400) {
            navigate(`../`, { replace: true });
            return;
          }
          return req.json();
        })
        .then((data) => {
          setVolcanoData(data);
        })
        .catch((error) => {
          setError(error.message);
        });
    }, 1000);
  }, [consumer.authenticated]);

  const loadingRequired = () => {
    if (error !== null) return false;
    if (volcanoData === undefined) return true;
    return false;
  };

  return (
    <AuthConsumer>
      {({ login, authenticated }) => (
        <div className="p-5 fly-in">
          <Nav defaultActiveKey="/home" as="ul" className="align-items-center">
            <Nav.Item as="li">
              <Button
                as={Link}
                to="/Volcanoes"
                replace={false}
                variant="warning"
              >
                <ChevronLeft />
                Back
              </Button>
            </Nav.Item>
            <Nav.Item as="li" className="ms-3">
              {loadingRequired() === true ? (
                <Placeholder animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              ) : (
                <b>
                  <span>{volcanoData.name}</span>
                </b>
              )}
            </Nav.Item>
          </Nav>

          <Container className="mt-5">
            <Row>
              <Col sm={4}>
                <Card style={{ width: "100%", border: "none" }}>
                  <Card.Img
                    variant="top"
                    src={SiteLogo}
                    className="align-self-center w-50"
                  />
                  {loadingRequired() === true ? (
                    <Card.Body>
                      <h1>
                        <Placeholder animation="glow">
                          <Placeholder xs={12} />
                        </Placeholder>
                      </h1>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                        <Placeholder xs={4} /> <Placeholder xs={6} />
                      </Placeholder>
                    </Card.Body>
                  ) : (
                    <Card.Body>
                      <h1>{volcanoData.name}</h1>
                      <Row>
                        <Col sm={4}>
                          <b>Country</b>
                        </Col>
                        <Col sm={8}>{volcanoData.country}</Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <Col sm={4}>
                          <b>Region</b>
                        </Col>
                        <Col sm={8}>{volcanoData.region}</Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <Col sm={4}>
                          <b>Subregion</b>
                        </Col>
                        <Col sm={8}>{volcanoData.subregion}</Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <Col sm={4}>
                          <b>Last Eruption</b>
                        </Col>
                        <Col sm={8}>{volcanoData.last_eruption}</Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <Col sm={4}>
                          <b>Summit</b>
                        </Col>
                        <Col sm={8}>{volcanoData.summit} m</Col>
                      </Row>
                      <hr></hr>
                      <Row>
                        <Col sm={4}>
                          <b>Elevation</b>
                        </Col>
                        <Col sm={8}>{volcanoData.elevation} ft</Col>
                      </Row>
                    </Card.Body>
                  )}
                </Card>
              </Col>
              <Col
                className="p-0"
                sm={8}
                style={{ borderRadius: "18px", overflow: "hidden" }}
              >
                {loadingRequired() === true ? (
                  <Placeholder animation="glow">
                    <Placeholder
                      style={{ height: "100%", width: "100%" }}
                      xs={12}
                    />
                  </Placeholder>
                ) : (
                  <Map
                    provider={osm}
                    defaultZoom={4}
                    center={[
                      parseFloat(volcanoData.latitude),
                      parseFloat(volcanoData.longitude),
                    ]}
                  >
                    <ZoomControl />
                    <Marker
                      width={50}
                      anchor={[
                        parseFloat(volcanoData.latitude),
                        parseFloat(volcanoData.longitude),
                      ]}
                      color={"#343434"}
                      // onClick={() => setHue(hue + 20)}
                    />
                  </Map>
                )}
              </Col>
            </Row>
            <Row className="mt-5">
              {loadingRequired() !== true && authenticated ? (
                <Bar
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: "Population density",
                      },
                    },
                  }}
                  data={{
                    labels: [
                      "Population 5km",
                      "Population 10km",
                      "Population 30km",
                      "Population 100km",
                    ],
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: [
                          volcanoData.population_5km,
                          volcanoData.population_10km,
                          volcanoData.population_30km,
                          volcanoData.population_100km,
                        ],
                        backgroundColor: "orange",
                      },
                    ],
                  }}
                />
              ) : null}
            </Row>
          </Container>
        </div>
      )}
    </AuthConsumer>
  );
}

async function fetchVolcano(country) {
  const req = await dataService.Req(VolcanoSpecificEp.specific(country));
  switch (req.status) {
    case 200:
      return req;
    case 401:
      throw Error(401);
    case 404:
      toast.error("We couldn't find that volcano in the database!");
      return [];
    default:
      console.log(req);
      break;
  }
  return [];
}

export default VolcanoView;
