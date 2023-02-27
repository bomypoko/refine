import { AuthBindings } from "@pankod/refine-core";
import { AuthHelper } from "@pankod/refine-strapi-v4";

import { TOKEN_KEY, API_URL } from "./constants";

import axios from "axios";

export const axiosInstance = axios.create();
const strapiAuthHelper = AuthHelper(API_URL + "/api");

export const authProvider: AuthBindings = {
    login: async ({ username, password }) => {
        const { data, status, statusText } = await strapiAuthHelper.login(
            username,
            password,
        );
        if (status === 200) {
            localStorage.setItem(TOKEN_KEY, data.jwt);

            // set header axios instance
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.jwt}`;

            return Promise.resolve({
                success: true,
                redirectTo: "/",
            });
        }

        return Promise.resolve({
            success: false,
            error: new Error(statusText),
        });
    },
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        return Promise.resolve({
            success: true,
            redirectTo: "/",
        });
    },
    onError: () => Promise.resolve({}),
    check: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
            return Promise.resolve({
                authenticated: true,
            });
        }

        return Promise.resolve({
            authenticated: false,
            logout: true,
            error: new Error("Token not found"),
            redirectTo: "/",
        });
    },
    getPermissions: () => Promise.resolve(),
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return Promise.resolve();
        }

        const { data, status } = await strapiAuthHelper.me(token);
        if (status === 200) {
            const { id, username, email } = data;
            return Promise.resolve({
                id,
                username,
                email,
            });
        }

        return Promise.resolve();
    },
};
