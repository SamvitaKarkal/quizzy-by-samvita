import axios from "axios";

const list = () => axios.get("/quizzes");

const show = slug => axios.get(`/quizzes/${slug}`);

const create = payload => axios.post("/quizzes/", payload);

const update = ({ slug, payload }) => axios.put(`/quizzes/${slug}`, payload);

const destroy = slug => axios.delete(`/quizzes/${slug}`);

const quizzesApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default quizzesApi;
