const axios = require('axios')
const express = require('express')
const tempData = require('./tempData')

require('dotenv').config()

const weatherRouter = express.Router()

weatherRouter.get('/', async (req, res, next) => {
	const mapForecast = tempData.map(weather => {
		return {
			observation_time: weather.observation_time.value,
			location: {
				lon: weather.lon,
				lat: weather.lat,
				name: "Salt Lake City, UT"
			},
			temperature: {
				f: (weather.temp.value * 1.8) + 32,
				c: weather.temp.value,
				feels_like: {
					f: (weather.feels_like.value * 1.8) + 32,
					c: weather.feels_like.value
				}
			},
			precipitation: {
				amount: weather.precipitation.value,
				type: weather.precipitation_type.value,
				probability: weather.precipitation_probability.value
			},
			humidity: weather.humidity.value,
			barometric_pressure: weather.baro_pressure.value,
			wind: {
				speed: {
					kph: weather.wind_speed.value * 2.23694,
					mph: weather.wind_speed.value * 3.6
				},
				gusts: {
					kph: weather.wind_gust.value * 2.23694,
					mph: weather.wind_gust.value * 3.6
				}
			},
			visibility: {
				km: weather.visibility.value,
				m: weather.visibility.value * 0.621371
			},
			cloud_cover: weather.cloud_cover.value,
			sunrise: weather.sunrise.value,
			sunset: weather.sunset.value,
			moon_phase: weather.moon_phase.value,
			weather_code: weather.weather_code.value,
			health_concern: weather.epa_health_concern.value,
			pollen: {
				grass: weather.pollen_grass.value,
				tree: weather.pollen_tree.value,
				weed: weather.pollen_weed.value
			}
		}
	})

	res.send({
		success: true,
		forecast: mapForecast
	})

	// await axios({
	// 	"method": "GET",
	// 	"url": "https://climacell-microweather-v1.p.rapidapi.com/weather/forecast/hourly",
	// 	"headers": {
	// 		"content-type": "application/octet-stream",
	// 		"x-rapidapi-host": process.env.X_RAPIDAPI_HOST,
	// 		"x-rapidapi-key": process.env.X_RAPIDAPI_KEY,
	// 		"useQueryString": true
	// 	}, "params": {
	// 		"fields": [
	// 			"temp", 
	// 			"feels_like", 
	// 			"humidity", 
	// 			"wind_speed",
	// 			"wind_gust",
	// 			"baro_pressure",
	// 			"precipitation",
	// 			"precipitation_type",
	// 			"precipitation_probability",
	// 			"sunrise",
	// 			"sunset",
	// 			"visibility",
	// 			"cloud_cover",
	// 			"surface_shortwave_radiation",
	// 			"moon_phase",
	// 			"weather_code",
	// 			"epa_aqi",
	// 			"epa_health_concern",
	// 			"pollen_tree",
	// 			"pollen_weed",
	// 			"pollen_grass",
	// 			"road_risk_score",
	// 			"road_risk_conditions"
	// 		],
	// 		"unit_system": "si",
	// 		"lat": "40.755890",
	// 		"lon": "-111.914410"
	// 	}
	// })
	// 	.then((response) => {
	// 		console.log(response.data)
	// 		res.send({
	// 			success: true
	// 		})
	// 	})
	// 	.catch((error) => {
	// 		console.error(error)
	// 		res.send({
	// 			success: false
	// 		})
	// 	})
})

module.exports = weatherRouter