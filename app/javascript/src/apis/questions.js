import axios from "axios";

const list = () => axios.get("/questions");

const show = id => axios.get(`/questions/${id}`);

const create = payload => axios.post("/questions/", payload);

const update = ({ id, payload }) => axios.put(`/questions/${id}`, payload);

const destroy = id => axios.delete(`/questions/${id}`);

const questionsApi = {
  list,
  show,
  create,
  update,
  destroy,
};

export default questionsApi;
