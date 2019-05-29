"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class DataStore {
    static async write(path, data) {
        return new Promise((resolve, reject) => {
            fs.open(path, 'w', (err, fd) => {
                if (err) {
                    return reject(err);
                }
                let str = JSON.stringify(data);
                fs.write(fd, str, (err, written) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(written);
                    }
                });
            });
        });
    }
    static async list(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    return reject(err);
                }
                let vehicles = [];
                files.forEach((file) => {
                    let bytes = fs.readFileSync(path + file);
                    let vehicle = JSON.parse(bytes.toString());
                    vehicles.push(vehicle);
                });
                return resolve(vehicles);
            });
        });
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=datastore.js.map