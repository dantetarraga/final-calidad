import { ajax } from "../../utils/ajax";

export const getFriends = async () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/amigos",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return ajax(config);
};

export const getFriendRequests = async () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/solicitudes",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return ajax(config);
};

export const suggestFriends = async () => {
  const config = {
    method: "GET",
    url: "http://localhost:3000/sugerencias",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  return ajax(config);
};

export const addFriend = async (receptorId) => {
  const config = {
    method: "POST",
    url: "http://localhost:3000/enviar-solicitud",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: { receptorId },
  };

  return ajax(config);
};
