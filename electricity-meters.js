// this is our
module.exports = function (pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(street_id) {
		const specificStreet = await pool.query(`select * from electricity_meter where id = $1`, [street_id]);
		console.log(specificStreet);
		return specificStreet.rows

	}

	// return all the appliances
	async function appliances() {
		const allAppliance = await pool.query(`select * from appliance`)
		return allAppliance.rows
	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		const addBalance = await pool.query(`Update electricity_meter.balance 
		sum(appliance.rate + sum(electricity_meter.balance)) 
		AS new_bal FROM electricity_meter 
		INNER JOIN appliance 
		ON electricity_meter.id = appliance.id`, [meterId, units])
		return addBalance.rowCount
	}

	// return the data for a given balance
	async function meterData(meterId) {
		//update query
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		const decreaseBalance = await pool.query(`Update electricity_meter.balance 
		sum(appliance.rate - sum(electricity_meter.balance))
		AS new_bal FROM electricity_meter 
		INNER JOIN appliance 
		ON electricity_meter.id = appliance.id`, [meterId, units])
		return decreaseBalance.rowCount
	}


	// show total balance for each street
	async function totalStreetBalance(streetId) {
		const sql = `select sum(rate * balance) as total_cost
		from street
		join street_item on street_item.street_id = street.id
		join appliance on street_id = street_item.street_id
		where street.id = $1`

		const total = await pool.query(sql, [streetId]);

		if(total.rowCount > 0){
			total.rows[0].total_cost
		}
		return 0
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