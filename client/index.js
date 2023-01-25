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

        console.log(data)

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
                logout: eval(logout),
                msg: eval(buildUI)
            });

        } else {

            buildUI({
                operation: "msg",
                type: "error",
                msg: data.error
            });

        }
         
    } catch( error ) {
        console.error(error);
    }
}

/**
 * Función de registro de usuarios
 * @param { json } data 
 */
async function register(form) {

    let registerData = {
        email: form[0].value,
        password: form[1].value
    }

    try {
        let res = await fetch('http://localhost:3000/api/user/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(registerData),
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
    console.log(data)
    if( data.operation === "login" ) {

        $('.container').css("display", "none");
        $('.logout').css("display", "block");

    } else if( data.operation === "logout" ) {

        $('.container').css("display", "block");
        $('.logout').css("display", "none");

    } else if ( data.operation === "msg" ) {

        if( data.type === "error") {

            $('.alert').removeClass('alert-success');
            $('.alert').addClass('alert-danger');

        } else if ( data.type === "success" ) {

            $('.alert').removeClass('alert-danger');
            $('.alert').addClass('alert-success');

        }

        $('.alert').html( data.msg );

    }
}