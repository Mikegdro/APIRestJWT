class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;
    logout = null;

    init(config) {
        this.logout = config.logout;

        let serverIP = `ws://${config.ip}:${config.port}`;
        //WEBSOCKETRESQUEST => https://github.com/theturtle32/WebSocket-Node/blob/cce6d468986dd356a52af5630fd8ed5726ba5b7a/docs/WebSocketRequest.md
        this.socket = new WebSocketRequest()

        this.socket.onopen = (e) => {
            this.state = true;
        };

        this.socket.onmessage = (event) => {
            let objeto = JSON.parse(event.data);

            console.log(objeto, objeto.resultado)

            $('.resultado').text(``);
            
            console.log(objeto)
        };

        this.socket.onclose = (event) => {
            this.state = false;
            console.log("Disconnected from the server");
            this.logout();
        };

        this.socket.onerror = (error) => {
            this.state = false;
        };
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
            regex: data[0].value,
        }

        this.socket.send(JSON.stringify(msg));
    }

    close() {
        this.socket.close();
        this.state = false;
    }
}

export { Communication };