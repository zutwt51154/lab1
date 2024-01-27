function getWeather() {
    let reqCurr= new XMLHttpRequest();
    let reqLoc = new XMLHttpRequest();
    let location = document.getElementById("location").value;

    reqLoc.open("GET",`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=20e6c62000ae0855f5623112ffe5d191&units=metric`,true)
    reqLoc.addEventListener("load", function(event) {
        let locResponse = JSON.parse(reqLoc.responseText);
        console.log(locResponse);
        let lat = locResponse['0']['lat'];
        let lon = locResponse['0']['lon'];

        reqCurr.open("GET",`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=20e6c62000ae0855f5623112ffe5d191&units=metric`,true);
        reqCurr.addEventListener("load",function(event) {
            let currentDiv = document.getElementById("currentDiv");
            let currentResponse = JSON.parse(reqCurr.responseText);
            console.log(currentResponse);

            let date = new Date(currentResponse['dt']*1000).toLocaleDateString("pl-PL");
            let currentStr = currentResponse['weather']['0']['main']+", Temp: "+currentResponse['main']['temp']+", ";
            let currentText = document.createElement("p");

            let currentImg = document.createElement("img");
            let icon = currentResponse['weather']['0']['icon'];
            currentImg.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`);

            currentText.innerText = currentStr;
            currentDiv.innerHTML='';
            let currentHeader = document.createElement("h3");
            currentHeader.innerText="Obecnie, "+date;
            currentDiv.appendChild(currentHeader);
            currentDiv.appendChild(currentImg);
            currentDiv.appendChild(currentText);
        });
        reqCurr.send(null);

        let reqFore = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=20e6c62000ae0855f5623112ffe5d191&units=metric`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let date,forecastStr,forecastText,forecastImg,icon;
                let forecastDiv = document.getElementById("forecastDiv");
                forecastDiv.innerHTML='';
                for(let i=0; i<40; i++){
                    let forecastDayDiv = document.createElement("div");
                    let forecastHeader = document.createElement("h3");
                    forecastHeader.innerText=data['list'][i]['dt_txt'];
                    forecastDayDiv.className = "forecastDayDiv";
                    forecastStr = data['list'][i]['weather']['0']['main']+", Temp: "+data['list'][i]['main']['temp'];
                    forecastText = document.createElement("p");
                    forecastImg = document.createElement("img");
                    icon = data['list'][i]['weather']['0']['icon'];
                    forecastImg.setAttribute("src",`https://openweathermap.org/img/wn/${icon}@2x.png`);
                    forecastText.innerText = forecastStr;
                    forecastDayDiv.appendChild(forecastHeader);
                    forecastDayDiv.appendChild(forecastImg);
                    forecastDayDiv.appendChild(forecastText);
                    forecastDiv.appendChild(forecastDayDiv);
                }
            })
    });
    reqLoc.send(null);
}