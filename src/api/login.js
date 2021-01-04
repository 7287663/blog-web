import v from "../utils/req";

export function login(username, password) {
    const login = v.request({
            url: "/login",
            method: 'post',
            data: {
                username, password
            }
        }
    )
    return login;
}

