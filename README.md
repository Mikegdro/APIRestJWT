# APIRestJWT
API Rest utilizando Json Web Tokens para la autentificación de usuarios, con MongoDB y Web Sockets.

---------------- Instalación ---------------------------<br/>
Usar el comando npm install en las carpetas regexMicroservice y database para instalar las respectivas dependencias. Una vez hecho esto se puede usar el comando docker-compose up para levantar los contenedores. 

---------------- CLIENT ---------------------------<br/>
Aplicación front-end servida por un servidor web/proxy, esta aplicación conecta al usuario con ambas lógicas de negocio, la base de datos con el servicio de autenticación y el servicio de expresiones regulares.

Tecnologías --> JQuery, Bootstrap, SwiperJS, Socket.io

Ruta / : http://localhost:80/

----------------- Database ---------------------<br/>
Servidor al que se accede através de un proxy, este tiene una red interna en la cual se encuentra la base de datos y es el único con las credenciales de acceso a dicha base de datos. 

Tecnologías --> NodeJS, MongoDB, Mongoose, JsonWebToken

Rutas_proxy: {<br/>
    &nbsp;login: http://localhost:80/api/user/auth/login,<br/>
    &nbsp;logout: http://localhost:80/api/user/auth/logout<br/>
}

----------------- Servidor REGEX ----------------<br/>
Servidor de WebSocket con la lógica del servicio de expresiones regulares, solo se puede acceder a el a través de un proxy. Tiene una cola implementada y es capaz de procesar 4 request a la vez por lo que las que vienen de más las mete en una cola para procesarlas más tarde.

Tecnologías --> Jison/lex, Socket.io, JS Workers

Rutas_proxy: {<br/>
    &nbsp;regex: http://localhost:80/regex<br/>
}
