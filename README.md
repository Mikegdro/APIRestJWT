# APIRestJWT
API Rest utilizando Json Web Tokens para la autentificación de usuarios, con MongoDB y Web Sockets.

---------------- CLIENT ---------------------------<br/>
El cliente va a hacer uso de HTML, CSS y JS con JQuery, va a mostrar un formulario de 
login, register y logout, con el que por medio de métodos asíncronos y la API Fetch de JS
podremos recoger los datos de la Base de datos (database), y montar la información nueva en
pantalla dependiendo de la respuesta del servidor de base de datos.

    · Respuesta 1 -> Error: Mostrar el tipo de error en el formulario para que el 
    usuario pueda volver a intentarlo

    · Respuesta 2 -> Ok: En caso de que se haya autentificado al usuario, deberemos guardar
    los datos y el token de manera segura, así como una IP de conexión con un servidor 
    al cual nos conectaremos a través de Web Sockets, una vez realizada la conexión se 
    renderizará la interfaz de introducción de expresiones regulares, con la cual el usuario
    podrá interactuar para mandar a este servidor esta expresión regular para que sea evaluada.

    · Interfaz 1 -> Login
    · Interfaz 2 -> regex

----------------- Database ---------------------<br/>
Servidor de base de datos, contará con MongoDB y una pequeña API por la que hacer consultas, 
este servidor será el encargado de crear JWT y compartirá una clave con el servidor de REGEX
con la cual podrán crear y comprobar los tokens que les llegan. 

    · Recibe request, consulta la bbdd, devuelve un JSON, con un mensaje de error/token


----------------- Servidor REGEX ----------------<br/>
Este servidor está esperando una conexión por web socket, una vez esta se realice, tendrá que recibir un JSON, con una expresión regular y un JWT, tras comprobar el JWT este tendrá que ejecutar un script que sea capaz de comprobar una Expresión Regular de manera RECURSIVA y que devolverá al usuario una respues de si es válido o no. Tendrá una estructura de datos
interna con los tokens que le han pasado así como un valor asociado que nos dirá la cantidad
de veces que ese token ha hecho una petición siendo como máximo 5, en caso de llegar a ese máximo se le revocará el token al usuario y cortará la conexión del web socket.

    · Recibe request, comprueba JWT, Ejecuta expresión regular y devuelve respuesta JSON con el resultado de la consulta, si se han realizado 5 o más consultas, corta la conexión con ese usuario.


TO-DO
    · Comprobación de usuarios
    · Cortar la conexión con el usuario cuando lleve 5 consultas