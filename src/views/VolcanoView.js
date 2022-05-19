import React, { useRef, useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { AuthConsumer } from "../services/AuthProvider";
import Endpoints from "../helpers/Endpoints";
import DataService from "../services/DataRequestService";

const VolcanoSpecificEp = Endpoints().volcanoes();

const dataService = new DataService();

function VolcanoView() {
  const { id } = useParams();

  const [volcanoData, setVolcanoData] = useState();

  useState(() => {
    console.log("state");

    return () => {
      fetchVolcano(id).then((data) => {
        setVolcanoData(data);
        console.log(data);
      });
    };
  }, []);

  return (
    <AuthConsumer>
      {({ login, authenticated }) => (
        <div className="p-5 fly-in">
          <Nav defaultActiveKey="/home" as="ul" className="align-items-center">
            <Nav.Item as="li">
              <Button as={Link} to="/Volcanoes" replace={false} variant="link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                  />
                </svg>
                Back
              </Button>
            </Nav.Item>
          </Nav>
          <h1>Hel</h1>
          <p>Volcano ID: {id}</p>
        </div>
      )}
    </AuthConsumer>
  );
}

async function fetchVolcano(country) {
  const req = await dataService.Req(VolcanoSpecificEp.specific(country));
  switch (req.status) {
    case 200:
      const data = await req.json();
      return data;
    case 401:
      toast.error("Invalid username or password. Try again.");
      break;
    case 400:
      toast.error("Country is a required query parameter.");
      break;
    default:
      console.log(req);
      break;
  }
  return [];
}

export default VolcanoView;
