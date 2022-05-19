const Endpoints = () => {
  return {
    volcanoes: () => {
      return {
        all: () => {
          return {
            method: "GET",
            url: "/volcanoes",
          };
        },
        specific: (id) => {
          return {
            method: "GET",
            url: `/volcano/${id}`,
          };
        },
      };
    },
    countries: () => {
      return {
        all: () => {
          return {
            method: "GET",
            url: "/countries",
          };
        },
      };
    },
    auth: () => {
      return {
        login: () => {
          return {
            method: "POST",
            url: "/user/login",
          };
        },
        register: () => {
          return {
            method: "POST",
            url: "/user/register",
          };
        },
      };
    },
  };
};

export default Endpoints;
