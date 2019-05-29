"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
var VehicleColor;
(function (VehicleColor) {
    VehicleColor[VehicleColor["Red"] = 0] = "Red";
    VehicleColor[VehicleColor["Blue"] = 1] = "Blue";
    VehicleColor[VehicleColor["Green"] = 2] = "Green";
    VehicleColor[VehicleColor["Black"] = 3] = "Black";
})(VehicleColor = exports.VehicleColor || (exports.VehicleColor = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["Passenger"] = 0] = "Passenger";
    VehicleType[VehicleType["Commercial"] = 1] = "Commercial";
})(VehicleType = exports.VehicleType || (exports.VehicleType = {}));
class Vehicle {
    static generate_id() { return crypto.randomBytes(12).toString('hex'); }
    constructor(color) {
        this.vehicle_id = Vehicle.generate_id();
        this.color = color;
    }
}
exports.Vehicle = Vehicle;
class GroceryGetter extends Vehicle {
    constructor() {
        super(...arguments);
        this.miles_per_hour = 90;
        this.miles_per_gallon = 40;
        this.type = VehicleType.Passenger;
        this.name = GroceryGetter.name;
    }
    drive() { return 'Slowly cruising to the store 🚙'; }
}
exports.GroceryGetter = GroceryGetter;
class CopAttractor extends Vehicle {
    constructor() {
        super(...arguments);
        this.miles_per_hour = 180;
        this.miles_per_gallon = 20;
        this.type = VehicleType.Passenger;
        this.name = CopAttractor.name;
    }
    drive() { return 'Burning rubber down the highway 🏎'; }
}
exports.CopAttractor = CopAttractor;
class JunkHauler extends Vehicle {
    constructor() {
        super(...arguments);
        this.miles_per_hour = 60;
        this.miles_per_gallon = 10;
        this.type = VehicleType.Commercial;
        this.name = JunkHauler.name;
    }
    drive() { return 'Off to pull CopAttractor from the ditch again 🚛'; }
}
exports.JunkHauler = JunkHauler;
//# sourceMappingURL=vehicles.js.map