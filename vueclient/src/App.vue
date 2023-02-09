<template>
    <div class="rounded-lg py-10 gap-10 justify-center items-center bg-black/10 bg flex flex-col backdrop-blur-md w-full xl:w-1/2">
        <h1 class="font-Work font-regular text-4xl text-center">
            Inserta tus credenciales
        </h1>

        <!-- 
            Arrow Function para pasar argumentos del evento del hijo al padre, en este caso
            he hecho un "wrapping" de los argumentos en un objeto y he llamado a la función
            pasandole el objeto
        -->
        <loginForm v-if="isLogin" @login="obj => login(obj)"/>
        <regexForm v-else @regex="exp => regex(exp)"/>
        <div v-if="message.type" class="px-5 py-2" :style="{backgroundColor: message.type}">
            {{ message.content }}
        </div>
        
    </div>
</template>

<script>

    //Importación de los componentes Hijos
    import loginForm from './loginForm.vue';
    import regexForm from './regex.vue';
    import { Communication } from '../communication/communication'    

    //Exportamos el componente padre
    export default {
        data() {
            return {
                isLogin: true,
                communication: null,
                myToken: null,
                message: {
                    content: '',
                    type: ''
                },
            }
        },
        components: {
            loginForm,
            regexForm
        },
        methods: {
            async regex(regex) {
                if( this.communication ) {
                    this.communication.send(regex);
                }
            },
            async login(obj) {
                try {
                    
                    //Hacemos la petición asíncrona
                    let res = await fetch('http://localhost:3000/api/user/login', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj)
                    })

                    console.log(res)

                    //Recogemos la respuesta
                    let data = await res.json();

                    console.log(data)
                    

                    //Recogemos la variable de error
                    let error = `${data.error}`;

                    //Comprobamos si hay error y de que tipo

                    if(error === "null") {

                        //Recogemos el token
                        this.myToken = data.data.token;

                        //Cambiamos la interfaz
                        this.msg({ operation: 'login' })

                        //Creamos la conexión con el servidor de WS
                        this.communication = new Communication();
                        this.communication.init({
                            ip: data.body.serverIp,
                            port: `${data.body.serverPort}/regex`,
                            token: this.myToken,
                            logout: eval(this.logout),
                            msg: eval(this.msg)
                        })
                    }
                        

                } catch(err) {
                    console.log(err);
                }                
            },
            logout() {
                //Borramos el token y cambiamos de "pantalla"
                this.myToken = null;
                this.msg({ operation: 'logout' });

                //Comprobamos la comunicación y la cortamos
                if(this.communication != null) {
                    this.communication.close();
                    this.communication = null;
                }

            },
            /**
             * Función con la que cambiar la interfaz al llegar un mensaje nuevo.
             * También la reutilizo para cambios de interfaz propios para así
             * reutilizar código.
             */
            msg(data) {

                if( data.operation === 'login' || data.operation === 'logout') {
                
                    this.isLogin = !this.isLogin;

                } else if( data.operation === 'msg' ) {
                    
                    if( data.type === 'error' ) {

                        this.message.content = data.msg;
                        this.message.type = 'red';

                    } else {

                        this.message.content = data.msg;
                        this.message.type = 'green';

                    }

                }
                
                

            }
        }
    };
</script>
