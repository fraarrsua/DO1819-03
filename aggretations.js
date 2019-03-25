//El promedio, el mínimo, el máximo y la desviación estándar del número de viajes administrados por gerente.
 db.trips.aggregate([
			{$group: {_id:"$actor", 
			    tripsactor:{$sum:1}}},
					{$group:{ _id:0, avg: 
					    {$avg:"$tripsactor"}, 
					    min:{$min:"$tripsactor"}, 
					    max:{$max:"$tripsactor"}, 
					    stdev:{$stdDevPop:"$tripsactor"}}}
]);

//El promedio, el mínimo, el máximo y la desviación estándar del número de solicitudes por viaje.
 db.applications.aggregate([
			{$group: {_id:"$trip", applicationTrips:{$sum:1}}},
					{$group:{ _id:0, 
					    avg:{$avg:"$applicationTrips"}, 
					    min:{$min:"$applicationTrips"}, 
					    max:{$max:"$applicationTrips"}, 
					    stdev:{$stdDevPop:"$applicationTrips"}}}
]);

//El promedio, el mínimo, el máximo y la desviación estándar del precio de los viajes.

 db.trips.aggregate([
			{$group: {_id:"$price", 
			    tripsactor:{$sum:1}}},
					{$group:{ _id:0, avg: 
					    {$avg:"$tripsactor"}, 
					    min:{$min:"$tripsactor"}, 
					    max:{$max:"$tripsactor"}, 
					    stdev:{$stdDevPop:"$tripsactor"}}}
]);


//La proporción de aplicaciones agrupadas por estado.

db.applications.aggregate([
	{$facet:{
		totalApplications:[{$group: {_id:null,totalapplicationsTotals:{$sum:1}}}],
		groups:[{$group:{_id:"$status", total:{$sum:1}}}],
	}},
	{$project:{_id:0,groupsTotal:"$groups", totalApplications:"$totalApplications.totalapplicationsTotals"}},
	{$unwind:"$totalApplications"},
	{$unwind: "$groupsTotal"},
	{$project:{_id:0, status:"$groupsTotal._id", ratio:{$divide:["$groupsTotal.total","$totalApplications"]}}}
]);

