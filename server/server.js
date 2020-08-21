const cors = require('cors')
const express = require('express')

const weatherRouter = require('./routes/weather-router')

const app = express()

require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use('/api/weather', weatherRouter)

app.use((err, req, res, next) => {
	if (err) {
		console.error(err)
		if (err.name === 'UnauthorizedError') {
			res.status(err.status)
		}
		return res.send({
			message: err.message
		})
	}
})

app.get('/', (req, res) => res.json({
	success: true
}))

app.listen(
	process.env.SERVER_PORT || 4000,
	() => console.log(`Listening on port ${process.env.SERVER_PORT}`)
)