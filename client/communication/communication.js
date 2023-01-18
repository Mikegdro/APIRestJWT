class Communication {
    socket = null;
    state = false;
    master = false;
    handler = null;
    logout = null;

    init(config) {
        this.logout = config.logout;
        
        this.socket = new WebSocket(`ws://${config.ip}:${config.port}/ws?token=${config.token}`);

        this.socket.onopen = (e) => {
            this.state = true;
        };

        this.socket.onmessage = (event) => {
            let objeto = JSON.parse(event.data);
            $('.resultado').html(objeto)
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
        this.socket.send(JSON.stringify(data));
    }

    close() {
        this.socket.close();
        this.state = false;
    }
}

export { Communication };