# APIRestJWT
Esta aplicación consta de 2 ramas, en las cuales he realizado diferentes implementaciones de la 
misma aplicación.

La aplicación consiste en una calculadora, desarrollada con JISON, un intérprete de LEX para Javascript. Tenemos un servidor de autentificación, el cual nos autentifica usando una base de datos o (rama v2) un certificado digital instalado en el navegador. Para hacer peticiones a la calculadora se usan Websockets, Workers de javascript para concurrencia y colas implementadas a mano para que sea lo más fluido posible.

Rama V1  -- 1 Febrero 2023

    En esta rama se realiza la aplicación de la manera más básica, tiene autenticación con base de datos y usa MongoDB para ello, y autentifica al usuario con un JWT. La interfaz está implementada con JQuery, Bootstrap y SwiperJS.

Rama V2  -- 15 Febrero 2023

    En esta rama he usado mi primer framework Front-End, VueJS, y he realizado una SPA asíncrona que cambia la interfaz por medio de eventos. He utilizado un proxy inverso, que redirige las diversas peticiones a sus respectivos servidores, este servidor consta con certificado (auto-firmado), y redirige las peticiones a 3 servicios distintos, un servidor web (Nginx) que sirve la página, un servidor de autentificación (NodeJS) que nos da acceso mediante JWT, 

