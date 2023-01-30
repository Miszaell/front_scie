import axios from "axios";
import boot from "./axios";
import { Notify, Dialog, Loading, QSpinnerGears } from "quasar";
var baseUrl = `${process.env.API}`;
let token = sessionStorage.getItem("X_Token");

export default {
  login(params) {
    return axios
      .post(baseUrl + "login", params, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response.status >= 400) {
          Notify.create({
            type: "negative",
            message: "Error de usuario y/o contraseña",
          });
          console.log(error);
        }
        return error;
      });
  },
  send(method, url, params) {
    const config = {
      method: method,
      url: baseUrl + url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("X_Token")}`,
      },
      params: params,
    };
    return axios(config)
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        if (error.response >= 400) {
          Notify.create({
            type: "negative",
            position: "center",
            message: "" + error,
          });
          console.log(error);
        }
        return error;
      });
  },
  post(url, params) {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: "grey-9 ",
      message: "Cargando...",
    });
    return axios
      .post(baseUrl + url, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("X_Token")}`,
        },
      })
      .then((response) => {
        Loading.hide();
        Notify.create({
          color: "secondary",
          position: "top-right",
          message: "¡Listo!",
        });
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.response.status >= 400) {
          let errorTipe = JSON.stringify(error.response.data.error);
          console.log(String(errorTipe));
          Notify.create({
            type: "negative",
            position: "center",
            message: error + ": " + String(errorTipe),
          });
          console.log(error);
        }
        return error;
      });
  },
  put(url, params) {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: "grey-9 ",
      message: "Cargando...",
    });
    return axios
      .put(baseUrl + url, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("X_Token")}`,
        },
      })
      .then((response) => {
        Loading.hide();
        Notify.create({
          color: "secondary",
          position: "top-right",
          message: "¡Listo!",
        });
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.response.status >= 400) {
          let errorTipe = JSON.stringify(error.response.data.error);
          console.log(String(errorTipe));
          Notify.create({
            type: "negative",
            position: "center",
            message: error + ": " + String(errorTipe),
          });
          console.log(error);
        }
        return error;
      });
  },
  delete(url) {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: "grey-9 ",
      message: "Cargando...",
    });
    return axios
      .delete(baseUrl + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("X_Token")}`,
        },
      })
      .then((response) => {
        Loading.hide();
        Notify.create({
          color: "secondary",
          position: "top-right",
          message: "¡Listo!",
        });
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.response.status >= 400) {
          let errorTipe = JSON.stringify(error.response.data.error);
          console.log(String(errorTipe));
          Notify.create({
            type: "negative",
            position: "center",
            message: error + ": " + String(errorTipe),
          });
          console.log(error);
        }
        return error;
      });
  },
  get(url, params) {
    return axios
      .get(baseUrl + url, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("X_Token")}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch(function (error) {
        Loading.hide();
        if (error.response.status >= 400) {
          let errorTipe = JSON.stringify(error.response.data.error);
          console.log(String(errorTipe));
          Notify.create({
            type: "negative",
            position: "center",
            message: error + ": " + String(errorTipe),
          });
          console.log(error);
        }
        return error;
      });
  },
};
