window.addEventListener('load', () =>{
    let long
    let lat
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let degreeSection = document.querySelector('.degree-section')
    let temperatureMetric = document.querySelector('.temperature-metric')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude
            lat = position.coords.latitude

            //const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `https://api.openweathermap.org/data/2.5/weather?lang=ru&units=metric&lat=${lat}&lon=${long}&appid=405f57666fa6d8b8bb2e6b21e7e2ccfd`

            fetch(api)
                .then(response =>{
                    return response.json()
                })
                .then(data =>{
                    console.log(data)

                    const temperature = data.main.temp
                    const location = data.name
                    const {icon, description} = data.weather[0]

                    //Set DOM elements from the API
                    temperatureDegree.textContent = temperature
                    temperatureDescription.textContent = description
                    locationTimezone.textContent = location
                    
                    //Set Icon
                    setIcons(icon, document.querySelector('.icon'))
                    
                    //Changing temperature metric
                    degreeSection.addEventListener('click', function(){
                        let metric = temperatureMetric.textContent
                        let degree = temperatureDegree.textContent
                        switch(metric){
                            case 'C': 
                                temperatureDegree.textContent = ((degree * 1.8) + 32).toFixed(2)
                                temperatureMetric.textContent = 'F'
                                break
                            case 'F': 
                                temperatureDegree.textContent = (((degree - 32) / 1.8) + 273.15).toFixed(2)
                                temperatureMetric.textContent = 'K'
                                break
                            case 'K':
                                temperatureDegree.textContent = (degree - 273.15 ).toFixed(2)
                                temperatureMetric.textContent = 'C'
                                break
                        }
                    })
                })
        })
    }else{
        alert('This is not working because you are not allowed location')
    }
    
    function setIcons(icon, iconID){
        iconID.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    }

})