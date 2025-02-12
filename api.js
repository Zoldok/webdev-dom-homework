// import { formatDate } from "./Date.js";
import { renderComments, token } from "./render.js";
import { format } from "date-fns"

const host = "https://webdev-hw-api.vercel.app/api/v1/max-kyrtimov/comments";
const host2 = "https://wedev-api.sky.pro/api/v2/max-kyrtimov12/comments";



export const getAllComments = (comments) => {
    return fetch(host2, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            // if(response.status === 401) {
            //     password = prompt("Введите верный пароль");
            //     throw new Error("Нет авторизации");
            // }
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                // console.log(comment);
                const createDate = format(new Date(comment.date), 'yyy-MM-dd hh.mm.ss');
                return {
                    name: comment.author.name,
                    date: createDate,
                    text: comment.text,
                    active: false,
                    like: comment.likes,
                }
            });
            comments = appComments;
            renderComments(comments);
            // invisibleDivHead.classList.add('hidden');
        });
};

export const finComments = ({ text, token }) => {
    fetch(host2, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            forceError: false,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw new Error("Неверный запрос")
            } else if (response.status === 500) {
                throw new Error("Ошибка сервера")
            } else {
                alert("отсутствует интернет")
            }
        })
        .then((responseData) => {
            return getAllComments();
        })
        .then((data) => {
            // addFormLoad.classList.remove('hidden');
            // invisibleDiv.classList.add('hidden');
            // nameInputElement.value = "";
            // commentInputElement.value = "";
            // buttonElemtnt.disabled = true;
        })
        .catch((error) => {
            // addFormLoad.classList.add('hidden');
            //TODO: Отправлять с систему сбора ошибок
            if (error.message === "Ошибка сервера") {
                alert('Сервер не доступен, попробуй позже...');
                return;
            };
            if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                return;
            } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже")
            }
            console.warn(error);
        })
        .then((data) => {
            // addFormLoad.classList.remove('hidden');
            // invisibleDiv.classList.add('hidden');
        })
};


// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
export function loginUser({ login, password }) {
    return fetch("https:wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if(response.status === 400) {
            throw new Error('Неверный логин или пароль')
        }
        return response.json();
    });
}

export function registrUser({ login, password, name }) {
    return fetch("https:wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if(response.status === 400) {
            throw new Error('Такой пользователь уже существует')
        }
        return response.json();
    });
}