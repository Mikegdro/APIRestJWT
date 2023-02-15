import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;
    logout = null;

    init(config) {
        this.logout = config.logout;
        this.msg = config.msg;

        console.log(config)

        let serverIP = `wss://localhost:443`;
        
        console.log(`Trying to connect through wss to ${serverIP}`);

        this.socket = new io(serverIP, {
            path: "/regex",
            auth: {
                token: config.token
            },
            transports: ['websocket'],
            withCredentials: true
        });

        this.socket.on('open', () => {
            this.state = true;
        })

        this.socket.on('message', ( msg ) => {
            
            let msgType = "success";

            console.log(msg)

            if(msg.msg.indexOf("Este es un error") != -1) {
                msgType = "error";
            }

            this.msg({
                operation: "msg",
                msg: msg.msg,
                type: msgType
            })
            
            this.msg(msg);
        })

        this.socket.on('disconnect', (reason) => {
            //Se puede hacer diferentes casos dependiendo de la razón de la desconexión
            this.state = false;
            console.log("Disconnected from the server", reason);
        });

        this.socket.on("connect_error", (error) => {
            console.log(error)
            this.state = false;
            this.logout();
        });
    }

    static get MASTER () {
        return 0;
    }

    static get ALL () {
        return 1;
    }

    set handler(newHandler) {
        this._handler = newHandler;
    }

    get handler () {
        return this._handler;
    }

    send(data) {
        const msg = {
            regex: data,
        }

        this.socket.emit('regex', msg);
    }

    close() {
        this.socket.close();
        this.state = false;
    }
}

export { Communication };