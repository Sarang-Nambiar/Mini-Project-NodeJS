const request = require('request')
const forecast = (coordx, coordy, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordx}&lon=${coordy}&appid=10fdb15d1e3decaac4d6139088dfedf9`

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather services!')
        }else if(response.body.error){
            callback('Unable to find location')
        }else{
            const obj = response.body
            callback(undefined, {
                summary: obj.weather[0].description,
                temperature: obj.main.temp,
                precipProbability: obj.main.humidity
            })
        }
    })
}


module.exports = forecast;

