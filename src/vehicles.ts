import * as crypto from 'crypto'

export enum VehicleColor { Red, Blue, Green, Black }
export enum VehicleType { Passenger, Commercial }

export abstract class Vehicle {

	public vehicle_id: string 
	public color: VehicleColor
	abstract miles_per_hour: number
	abstract miles_per_gallon: number
	abstract type: VehicleType
	abstract name: string 
	public static generate_id(): string { return crypto.randomBytes(12).toString('hex') }
	abstract drive(): string

	constructor(color: VehicleColor) { 
		this.vehicle_id = Vehicle.generate_id()
		this.color = color
	}
}

export class GroceryGetter extends Vehicle {
	miles_per_hour = 90
	miles_per_gallon = 40
	type = VehicleType.Passenger
	name = GroceryGetter.name
	drive() { return 'Slowly cruising to the store 🚙' }
}

export class CopAttractor extends Vehicle {
	miles_per_hour = 180
	miles_per_gallon = 20
	type = VehicleType.Passenger
	name = CopAttractor.name
	drive() { return 'Burning rubber down the highway 🏎' }
}

export class JunkHauler extends Vehicle {
	miles_per_hour = 60
	miles_per_gallon = 10
	type = VehicleType.Commercial
	name = JunkHauler.name
	drive() { return 'Off to pull CopAttractor from the ditch again 🚛' }
}