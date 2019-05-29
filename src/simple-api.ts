import { Vehicle, VehicleColor, VehicleType, GroceryGetter, JunkHauler, CopAttractor } from './vehicles'
import { DataStore } from './datastore'

export abstract class SimpleAPI {

	public static async make_vehicle(vehicle_class: string): Promise<Vehicle> {

		let vehicle: Vehicle = await SimpleAPI.get_new_vehicle(vehicle_class)
		return SimpleAPI.save_vehicle(vehicle)
	}

	private static async get_new_vehicle(vehicle_class: string) {

		switch (vehicle_class) {
			
			case GroceryGetter.name:
				return new GroceryGetter(VehicleColor.Blue)
			
			case CopAttractor.name:
				return new CopAttractor(VehicleColor.Red)

			case JunkHauler.name:
				return new JunkHauler(VehicleColor.Green)
			
			default:
				throw new Error('Invalid vehicle class')
		}
	}

	private static async save_vehicle(vehicle: Vehicle): Promise<Vehicle> {

		let path = 'data/vehicles/' + vehicle.vehicle_id + '.json'
		return new Promise<Vehicle>((resolve, reject) => {

			DataStore.write(path, vehicle)
				.then(() => { return resolve(vehicle) })
				.catch((error) => { return reject(error)})
		})
	}

	public static async list_vehicles(): Promise<any> {

		let list = await DataStore.list('data/vehicles/')
		return list.forEach(item => console.log(item))
	}
}