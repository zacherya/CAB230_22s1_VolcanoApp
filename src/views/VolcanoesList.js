import React, { useEffect, useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Col, Row, Container, Button, FormControl } from "react-bootstrap";
import Endpoints from "../helpers/Endpoints";
import DataService from "../services/DataRequestService";
import { toast } from "react-toastify";
import DropdownList from "react-widgets/DropdownList";
import Listbox from "react-widgets/Listbox";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const CountriesEp = Endpoints().countries().all();
const VolcanoListEp = Endpoints().volcanoes().all();

const dataService = new DataService();

function VolcanoList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [volcanoData, setVolcanoData] = useState();
  const [countries, setCountries] = useState();

  const gridRef = useRef();
  const dropdownRef = useRef();

  const [volcanoHeaders] = useState([
    { field: "name" },
    { field: "region" },
    { field: "subregion" },
  ]);

  const searchStateRef = useRef();
  const [currentSearch, setCurrentSearch] = useState("");

  const rangeStateRef = useRef();
  const [selectedRange, setSelectedRange] = useState(null);

  const countryStateRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);

  // make stateRef always have the current country and range
  // the "fixed" callbacks can refer to this object whenever
  // they need the current value.
  // the callbacks will not be reactive - they will not
  // re-run the instant state changes but they *will* see
  //the current value whenever they do run
  rangeStateRef.current = selectedRange;
  countryStateRef.current = selectedCountry;

  const preFetch = useEffect(() => {
    return () => {
      fetchCountries().then((data) => {
        setCountries(data);
        onSelectCountry(data[0]);
      });
    };
  }, []);

  const onSelectCountry = useCallback((newCountry) => {
    //Reset search
    setCurrentSearch("");
    if (gridRef.current !== null && gridRef.current !== undefined)
      gridRef.current.api.setQuickFilter("");

    //Set selected country state
    setSelectedCountry(newCountry);

    //fetch volcanos
    fetchVolcanos(newCountry, rangeStateRef.current).then((data) =>
      setVolcanoData(data)
    );
  }, []);

  const onSelectRange = useCallback((newRange) => {
    setSelectedRange(newRange);
    fetchVolcanos(countryStateRef.current, newRange).then((data) =>
      setVolcanoData(data)
    );
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    if (selectedRows.length === 1) {
      //   history.push(`/Volcanoes/${selectedRows[0].id}`);
      navigate(`./${selectedRows[0].id}`, { replace: false });
    }
  }, []);

  const onFilterTextBoxChanged = useCallback((event) => {
    event.preventDefault();
    setCurrentSearch(event.target.value);
    gridRef.current.api.setQuickFilter(event.target.value);
  }, []);

  return (
    <Container
      className="text-start"
      style={{ height: "calc(100vh - var(--site-nav-height))" }}
    >
      <Row className="py-5 h-100">
        <Col sm={4}>
          <h2>Filters</h2>
          <Row className="mb-4">
            <div className="filter-header mb-1 d-flex justify-content-between align-items-center">
              <h6>Country</h6>
            </div>
            <div className="filter-widget">
              <DropdownList
                // defaultValue={countries[0]}
                ref={dropdownRef}
                data={countries}
                value={selectedCountry}
                onSelect={onSelectCountry}
              />
            </div>
          </Row>
          <Row>
            <div className="filter-header mb-1 d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Populated within</h6>
              <Button variant="link" onClick={() => onSelectRange(null)}>
                Clear
              </Button>
            </div>
            <div className="filter-widget">
              <Listbox
                dataKey="id"
                textField="color"
                value={selectedRange}
                onChange={onSelectRange}
                data={["5km", "10km", "30km", "100km"]}
              />
            </div>
          </Row>
        </Col>
        <Col sm={8}>
          <div className="filter-header mb-1 d-flex justify-content-between align-items-center">
            <h2>Volcanos</h2>
            <FormControl
              type="search"
              placeholder="Search"
              className="ms-5"
              aria-label="Search"
              onChange={onFilterTextBoxChanged}
              value={currentSearch}
            />
          </div>

          {/* {id === undefined ? (<p>No BVolc</p>) : (<p>{id}</p>)} */}
          <div
            className="ag-theme-alpine"
            style={{ height: "calc(100% - 49px)", width: "100%" }}
          >
            <AgGridReact
              ref={gridRef}
              rowData={volcanoData}
              columnDefs={volcanoHeaders}
              onSelectionChanged={onSelectionChanged}
              rowSelection={"single"}
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

async function fetchVolcanos(country, range) {
  const payload = { country: country };
  if (range !== undefined && range !== null) {
    payload.populatedWithin = range;
  }
  const req = await dataService.Req(VolcanoListEp, payload);
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

async function fetchCountries() {
  const req = await dataService.Req(CountriesEp);
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

export default VolcanoList;
