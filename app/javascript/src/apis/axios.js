import axios from "axios";
import Toastr from "components/Common/Toastr";
import { setToLocalStorage } from "helpers/storage";

axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const email = localStorage.getItem("authEmail");
  if (email) {
    axios.defaults.headers["X-Auth-Email"] = email;
  }
  setLoading(false);
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;
    if (response.data.notice) {
      Toastr.success(response.data.notice);
    }
  }
  return response;
};

const handleErrorResponse = error => {
  if (error.response?.status === 401) {
    setToLocalStorage({ email: null, userId: null, userName: null });
  }
  Toastr.error(
    error.response?.data?.error ||
      error.response?.data?.notice ||
      error.message ||
      error.notice ||
      "Something went wrong!"
  );
  if (error.response?.status === 423) {
    window.location.href = "/";
  }
  return Promise.reject(error);
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, error =>
    handleErrorResponse(error)
  );
};
