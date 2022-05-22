import React, { useContext } from "react";
import { toast } from "react-toastify";

import { AuthConsumer } from "./AuthProvider";

import { encrypt, decrypt } from "../helpers/Crypto";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default class DataService {
  constructor() {
    this.Req = this.Req.bind(this);
    this.Get = this.Get.bind(this);
    this.Post = this.Post.bind(this);
  }
  async Req(endpoint, payload) {
    switch (endpoint.method) {
      case "GET":
        return await this.Get(
          "{0}{1}".format(API_URL, endpoint.url),
          Headers(),
          payload
        );
      case "POST":
        return await this.Post(
          "{0}{1}".format(API_URL, endpoint.url),
          Headers(),
          payload
        );
      default:
        return await this.Get(
          "{0}{1}".format(API_URL, endpoint.url ?? ""),
          Headers(),
          payload
        );
    }
  }
  async Get(url, headers, payload) {
    return await fetch("{0}{1}".format(url, queryBuilder(payload)), {
      method: "GET",
      headers: headers,
    })
      // .then(response => response.json())
      .catch((error) => {
        toast.error(
          "An unexpected error has occured. Check your internet connection and try again."
        );
      });
  }
  async Post(url, headers, payload) {
    return await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    })
      // .then(response => response.json())
      .catch((error) => {
        toast.error(
          "An unexpected error has occured. Check your internet connection and try again."
        );
      });
  }
}

function queryBuilder(payload) {
  if (payload === undefined || payload === null) {
    return "";
  }
  const params = new URLSearchParams();
  Object.keys(payload).forEach((key) => {
    params.append(key, payload[key]);
  });
  return "?" + params.toString();
}

function handleStatusCode() {}

function Headers() {
  var headers = {
    "Content-Type": "application/json",
  };
  if (localStorage.getItem("user")) {
    headers["Authorization"] = `Bearer ${
      JSON.parse(decrypt(localStorage.getItem("user"))).token
    }`;
  }
  return headers;
}
