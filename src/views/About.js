import React from "react";
import DataService from "../services/DataRequestService";
import { AuthConsumer } from "../services/AuthProvider";
import Endpoints from "../helpers/Endpoints";

const dataService = new DataService();
const ep = Endpoints();

function About() {
    return (
        <a onClick={()=>dataService.Req(ep.volcanoes().specific(423))}>Test</a>
    );
}

export default About;