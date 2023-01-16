/*
*
*   Eventos Formulario
*
*/
$('.login').on('click', e => {
    let form = $('.loginForm').serializeArray();
    login(form);
});
$('.logout').on('click', e => {
    logout();
})
$('.register').on('click', e => {
    let form = $('.registerForm').serializeArray();
    register(form);
})

let myToken = null;

/**
 * Función asíncrona login, recibe un json con los valores del formulario
 * @param {json} form 
 */
async function login(form) {
    console.log(form)
    try {
        let res = await fetch('http://localhost:3000/api/user/login', {
            method: "POST",
            body: {
                email: form[0].value,
                password: form[1].value
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

async function logout() {
    try {
        let res = await fetch('http://localhost:3000/api/user/logout', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "auth-token": {myToken}
            },
        });

        let data = await res.json();

        let error = `${data.error}`;

        if(error === "null") {
            buildUI({
                operation: "logout",
            }); 
        }
         
    } catch(error) {
        console.error(error);
    }
}

/**
 * Función de construcción de interfaz para cuando se ha logeado/deslogeado un usuario
 * @param {json} data 
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