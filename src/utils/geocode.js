const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)
    + '.json?access_token=pk.eyJ1IjoiZGlzY2hhZCIsImEiOiJjbG92YW1uNnEwcGdpMmxsOXVqODBpemlvIn0.VmEnyPOeB15Gahp_5dBKag&limit=1'
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!');
        }else if(body.features?.length === 0){
            callback('Unable to find location. Please try again')
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;