# APIRestJWT
API Rest utilizando Json Web Tokens para la autentificación de usuarios, con MongoDB y Web Sockets.

---------------- CLIENT ---------------------------<br/>
El cliente consta de su aplicación, con la que podrá hacer login, logout, y mandar expresiones regulares una vez este logeado.

La interfaz esta hecha con JQuery y Bootstrap.

Una vez recibe el token del servidor de autenticación, se conecta automáticamente a través de WebSocket al servidor de expresiones 
regulares, para esto he hecho uso de la biblioteca Socket.io, que monta un servidor http encima del WebSocket para poder mandar
cabeceras con información de autenticación las cuales en este caso se necesitaban.

----------------- Database ---------------------<br/>
Servidor encargado de la base de datos mongodb, de la autenticación de usuarios, y de la expedición de token JWT para que el usuario
pueda acceder al resto de herramientas de nuestra aplicación.


----------------- Servidor REGEX ----------------<br/>
Servidor WebSocket, realizado con la biblioteca Socket.io, que recibe por cabeceras el token del usuario y este corrobora el token y le da 
acceso al usuario a 5 intentos.

----------------- POR HACER ------------------------<br/>
 · Que reste intentos y desconecte al usuario cuando los consuma
 · La respuesta Jison con los errores bien formateada
 · Servidor Proxy
 · Docker compose que monte automáticamente los servicios
 · Geolocalización