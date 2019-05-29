"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_1 = require("./vehicles");
const simple_api_1 = require("./simple-api");
const express = require("express");
class App {
    static get port() { return 3000; }
    static init() {
        switch (process.argv[2]) {
            case 'start-server':
                return App.start_server();
            case 'list-vehicles':
                return simple_api_1.SimpleAPI.list_vehicles();
            default:
                return App.display_help();
        }
    }
    static start_server() {
        const server = express();
        server.get('/make-vehicle', App.make_vehicle);
        server.get('/', (req, res) => { res.send('call /make-vehicle to create a vehicle'); });
        server.listen(App.port, () => { console.log('Listening on port ' + App.port); });
    }
    static make_vehicle(request, response) {
        let types = [vehicles_1.GroceryGetter.name, vehicles_1.CopAttractor.name, vehicles_1.JunkHauler.name];
        if (!request.query.class || !types.includes(request.query.class)) {
            return response.send('class parameter must be one of [ ' + types.join(' | ') + ' ]');
        }
        simple_api_1.SimpleAPI.make_vehicle(request.query.class)
            .then((vehicle) => { response.json(vehicle); });
    }
    static display_help() { console.log('usage: index.ts [ start-server | list-vehicles ]'); }
}
App.init();
//# sourceMappingURL=index.js.map