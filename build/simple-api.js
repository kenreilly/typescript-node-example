"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_1 = require("./vehicles");
const datastore_1 = require("./datastore");
class SimpleAPI {
    static async make_vehicle(vehicle_class) {
        let vehicle = await SimpleAPI.get_new_vehicle(vehicle_class);
        return SimpleAPI.save_vehicle(vehicle);
    }
    static async get_new_vehicle(vehicle_class) {
        switch (vehicle_class) {
            case vehicles_1.GroceryGetter.name:
                return new vehicles_1.GroceryGetter(vehicles_1.VehicleColor.Blue);
            case vehicles_1.CopAttractor.name:
                return new vehicles_1.CopAttractor(vehicles_1.VehicleColor.Red);
            case vehicles_1.JunkHauler.name:
                return new vehicles_1.JunkHauler(vehicles_1.VehicleColor.Green);
            default:
                throw new Error('Invalid vehicle class');
        }
    }
    static async save_vehicle(vehicle) {
        let path = 'data/vehicles/' + vehicle.vehicle_id + '.json';
        return new Promise((resolve, reject) => {
            datastore_1.DataStore.write(path, vehicle)
                .then(() => { return resolve(vehicle); })
                .catch((error) => { return reject(error); });
        });
    }
    static async list_vehicles() {
        let list = await datastore_1.DataStore.list('data/vehicles/');
        return list.forEach(item => console.log(item));
    }
}
exports.SimpleAPI = SimpleAPI;
//# sourceMappingURL=simple-api.js.map