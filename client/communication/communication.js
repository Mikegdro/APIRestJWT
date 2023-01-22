import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;
    logout = null;

    init(config) {
        this.logout = config.logout;

        let serverIP = `ws://${config.ip}:${config.port}`;
        
        this.socket = new io(serverIP, {
            auth: {
                token: config.token
            }
        });

        this.socket.on('open', () => {
            this.state = true;
            console.log(this.socket)
        })

        this.socket.on('message', (msg) => {
            console.log(msg);
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
        console.log(data)
        const msg = {
            regex: data[0].value,
        }

        this.socket.emit('regex', msg);
    }

    close() {
        this.socket.close();
        this.state = false;
    }
}

export { Communication };