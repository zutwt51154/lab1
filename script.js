let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("getLocation").addEventListener("click", function(event) {
    if (! navigator.geolocation) {
        console.log("No geolocation.");
    }

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon]);
        //let marker = L.marker([lat,lon]).addTo(map);
    }, positionError => {
        console.error(positionError);
    });
});

document.getElementById("saveButton").addEventListener("click", function() {
    /* //Wyświetlanie całego canvasa przed podziałem

    leafletImage(map, function (err, canvas) {
        let rasterMap = document.getElementById("rasterMap");
        rasterMap.width=400;
        rasterMap.height=400;
        let rasterContext = rasterMap.getContext("2d");
        rasterContext.drawImage(canvas,0,0,400,400);
    });
     */




    let elements = document.getElementById("elements");
    elements.innerHTML='';
    let puzzleArray = [];

    for(let i = 0;i < 4; i++){
        for(let j = 0; j < 4; j++){
            leafletImage(map, function (err, canvas) {
                let rasterMap = document.createElement("canvas");
                let ID = i*4+j;
                rasterMap.id=ID.toString();

                rasterMap.className = "element";
                rasterMap.width=100;
                rasterMap.height=100;

                let rasterContext = rasterMap.getContext("2d");

                rasterMap.draggable = true;
                rasterMap.ondragstart = function (event) {
                    drag(event);
                };

                rasterContext.drawImage(canvas, j*100, i*100, 100, 100, 0, 0, 100, 100);
                elements.appendChild(rasterMap);
            });
        }
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drag(event) {
    event.dataTransfer.setData("text/html", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/html");
    let draggedElement = document.getElementById(data);
    let dragSlot = event.target;
    draggedElement.draggable = false;
    dragSlot.appendChild(draggedElement);

    if(isSolved()){
        console.log("Puzzle rozwiązane!");
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    let notification = new Notification("Puzzle rozwiązane!", {
                        body: "Gratulacje :)"
                    });
                }
            });
        }
    }
}

function isSolved() {
    for(let k = 0;k < 4; k++) {
        for (let l = 0; l < 4; l++) {
            let id = 4*k+l;
            let slot = document.getElementById(id+"c");

            if(slot.hasChildNodes()){
                let child = slot.firstChild;

                if(child.id != id)
                    return false;
            }
            else
                return false;
        }
    }
    return true;
}