import { Communication } from "./communication/communication.js";

//Token que se obtiene del servidor al logearse
let myToken = null;

//Objeto communication que manejará el web socket de regex
let communication = null;

/*
*   Eventos Formulario
*/
$('.login').on('click', e => {
    let form = $('.loginForm').serializeArray();
    login(form);
});
$('.logoutBtn').on('click', e => {
    logout();
})
$('.register').on('click', e => {
    let form = $('.registerForm').serializeArray();
    register(form);
})
$('.sendRegex').on('click', e => {
    if(communication) {
        communication.send( $('.regexForm').serializeArray() );
    }
})



/**
 * Función asíncrona login, recibe un json con los valores del formulario
 * @param { json } form 
 */
async function login(form) {

    let loginData = {
        email: form[0].value,
        password: form[1].value
    }

    try {
        let res = await fetch('http://localhost:3000/api/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),

        });

        let data = await res.json();

        let error = `${data.error}`;

        if(error === "null") {
            myToken = data.data.token;

            buildUI({
                operation: "login",
            });
            
            communication = new Communication();
            communication.init({
                ip: data.body.serverIp,
                port: data.body.serverPort,
                token: myToken,
                logout: eval(logout)
            });

        }
         
    } catch(error) {
        console.error(error);
    }
}

/**
 * Función de registro de usuarios
 * @param { json } data 
 */
async function register(form) {
    try {
        let res = await fetch('http://localhost:3000/api/user/register', {
            method: "GET",
            body: {
                name: form[0].value,
                email: form[1].value,
                password: form[2].value
            },

        });

        let data = await res.json();

        let error = `${data.error}`;

        if(error === "null") {
            myToken = data.data.myToken;

            buildUI({
                operation: "login",
            }); 
        }
         
    } catch(error) {
        console.error(error);
    }
}

/**
 * Función de logout, borra el token de manera local y reinicia la interfaz
 * @param { json } data 
 */
async function logout() {
    myToken = null;
    
    if(communication != null) {
        communication.close();
        communication = null;
    }

    buildUI({
        operation: "logout"
    });
}

/**
 * Función de construcción de interfaz dependiendo de los parámetros del JSON
 * @param { json } data 
 */
function buildUI(data) {
    if( data.operation === "login" ) {
        $('.container').css("display", "none");
        $('.logout').css("display", "block");
    } else if( data.operation === "logout" ) {
        $('.container').css("display", "block");
        $('.logout').css("display", "none");
    }
}