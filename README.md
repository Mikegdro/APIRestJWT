# APIRestJWT

---------------- Versión 1 ---------------------------<br/>
La versión 1 implementa 3 servidores, uno de autenticación, que usa MongoDB con mongoose, este devuelve un JSON Web Token al usuario que se ha autenticado
y con este token se pueden hacer consultas al segundo servidor, este servidor implemente un servicio de Jison, el cual parsea la entrada y devuelve si la expresión
es matemática y esta correctamente. La conexión al servidor de micro-servicios se hace mediante un Web Socket haciendo uso de la librería Socket.io para mandar una 
cabecera con el token para que el servidor de WebSocket autorice apropiadamente la conexión. La conexión con el servidor de autenticación se realiza mediante express y 
protocolos HTTP. El 3 servidor es un proxy, que redigirá las peticiones al servidor correspondiente.

        ----------------- TO-DO ----------------<br/>
            · Proxy
            · Docker-compose
            · Workers
            · Cortar la conexión con el usuario cuando lleve 5 consultas

---------------- Versión 2 ---------------------------<br/>
La versión 2 implementa también 3 servidores, con la diferencia que el servidor de autenticación en vez de usar una base de datos y MongoDB, le devolverá al cliente
un certificado digital, este será instalado en el navegador del cliente, por lo que una vez se conecten los usuarios, aparte de recibir un web token también deberemos de 
comprobar que la petición está siendo realizada por un navegador en el cual nuestra Autoridad Certificadora confía. Para varíar un poco la cosa en el cliente, se usará 
VueJs para el front-end y TailwindCSS usando Vite como empaquetador del proyecto ( Deseadme suerte con eso ).