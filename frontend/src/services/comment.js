import { ajax } from "../../utils/ajax";

export const getComments = async (id) => {
  const config = {
    method: "POST",
    url: "http://localhost:3000/comentarios",
    withCredentials: true,
    data: { idPost: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
  };

  return await ajax(config);
};

export const commentPost = async (comment, id) => {
  const config = {
    method: "POST",
    url: "http://localhost:3000/comentar",
    withCredentials: true,
    data: { contenido: comment, idPost: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${token}`,
    },
  };

  return await ajax(config);
};
