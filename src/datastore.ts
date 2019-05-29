import * as fs from 'fs'
import { Vehicle } from './vehicles'

export class DataStore {

	public static async write(path: string, data: Object): Promise<any> {

		return new Promise((resolve, reject) => {

			fs.open(path, 'w', (err, fd) => {
				
				if (err) { return reject(err) }

				let str = JSON.stringify(data)
				fs.write(fd, str, (err, written) => {

					if (err) { reject(err) }
					else { resolve(written) }
				})
			})
		})
	}

	public static async list(path: string): Promise<Vehicle[]> {

		return new Promise<Vehicle[]>((resolve, reject) => {

			fs.readdir(path, (err, files) => {
				
				if (err) { return reject(err) }

				let vehicles = []
				files.forEach((file) => {
					
					let bytes = fs.readFileSync(path + file)
					let vehicle = JSON.parse(bytes.toString())
					vehicles.push(vehicle)
				})

				return resolve(vehicles)
			})
		})
	}
}