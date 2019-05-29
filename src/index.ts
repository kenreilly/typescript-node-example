import { GroceryGetter, JunkHauler, CopAttractor } from './vehicles';
import { SimpleAPI } from './simple-api'
import * as express from 'express'

abstract class App {

	static get port(): number { return 3000 }

	static init(): any {

		switch (process.argv[2]) {

			case 'start-server':
				return App.start_server()
			case 'list-vehicles':
				return SimpleAPI.list_vehicles()
			default:
				return App.display_help()
		}
	}

	static start_server(): void {
		
		const server = express()
		server.get('/make-vehicle', App.make_vehicle)
		server.get('/', (req, res) => { res.send('call /make-vehicle to create a vehicle') })
		server.listen(App.port, () => { console.log('Listening on port ' + App.port) })
	}

	static make_vehicle(request: express.Request, response: express.Response) {
		
		let types: Array<string> = [ GroceryGetter.name, CopAttractor.name, JunkHauler.name ]
		if (!request.query.class || !types.includes(request.query.class)) { 
			return response.send('class parameter must be one of [ ' + types.join(' | ') + ' ]')
		}

		SimpleAPI.make_vehicle(request.query.class)
			.then((vehicle) => { response.json(vehicle) })
	}

	static display_help() { console.log('usage: index.ts [ start-server | list-vehicles ]')}
}

App.init()