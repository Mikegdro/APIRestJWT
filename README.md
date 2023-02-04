# APIRestJWT
API Rest utilizando Json Web Tokens para la autentificación de usuarios, con MongoDB y Web Sockets.

---------------- Instalación ---------------------------<br/>

Usar los siguientes comandos:
    1) npm install //En todas las carpetas con package*.json
    2) docker-compose up --build //En la carpeta general para montar los servicios y usar la aplicación 

---------------- Client ---------------------------<br/>

Cliente que conecta al usuario final con la lógica del programa sin dejarle acceso. Se conecta a un proxy que redirige las peticiones a los respectivos servidores.
Este cliente está desarrollado haciendo uso de librerías Front-end y hace uso de tecnologías como WebSockets y Fetch para conseguir datos del servidor y cambiar la 
IU adecuándola a la necesidad del momento. 

    Tecnologías:
        · VueJS
        · TailwindCSS
        · Vite

----------------- Auth ---------------------<br/>

Servidor de autenticación, que requiere de certificados en la parte del cliente, para que así solo los ordenadores autorizados por la compañía puedan acceder.
Para hacer uso de esta aplicación es necesario instalar en el navegador el archivo ./certificates/user/user.pfx .

    Tecnologías:
        · JSON Web Token
        · Express
        · NodeJS


----------------- Calculator ----------------<br/>

Servidor de WebSocket con la lógica del servicio de expresiones regulares, solo se puede acceder a el a través de un proxy. Tiene una cola implementada y es capaz de procesar 4 request a la vez por lo que las que vienen de más las mete en una cola para procesarlas más tarde.

    Tecnologías 
        · Jison/lex
        · Socket.io
        · JS Workers

----------------- TO-DO ----------------<br/>

    1) Crear un servidor web que sirva el cliente para no servirla con el proxy.
    2) Añadirle también Geo-Localización para que nadia de fuera del instituto pueda acceder aparte del certificado.
    3) Desarrollar todas las partes de la aplicación desde 0 para refactorizar lo máximo posible el código y documentarlo de la mejor manera posible.
    4) Desarrollar la interfaz nueva con Vite montando un proyecto en conjunto de VueJS + TailwindCSS que sea sencillo, liviano, bonito y sencillo de utilizar.
