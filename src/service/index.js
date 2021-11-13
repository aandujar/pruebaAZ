import axios from "axios";

export function getUsers(params, headers) {
    return axios.get("https://randomuser.me/api/", { params: params });
}