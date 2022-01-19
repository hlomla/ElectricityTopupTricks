// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		const specificStreet =  await pool.query(`select * from street where id = $1`);
		const showStreet = await pool.query(specificStreet, [streetId])
		if(showStreet.rows.length > 0){
			return showStreet.rows[0]
		}
		
	}

	// return all the appliances
	async function appliances() {
		const allAppliance = await pool.query(`select * from appliance`)
		return allAppliance.rows
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {

	}
	
	// return the data for a given balance
	async function meterData(meterId) {
	
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
	
	}

	// show total balance for each street
	async function totalStreetBalance(){

	}

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		totalStreetBalance
	}


}