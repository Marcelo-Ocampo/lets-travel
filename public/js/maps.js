let platform = new H.service.Platform({
    'apikey': 'DTV0x1ufjI8j9V5wJwTg1WTtwwSqQTdrtYkp0aHz-E8'
});


function landmarkGeocode() {
    let landmarkTitle = document.querySelector('h1').textContent;
    let geocoder = platform.getGeocodingService(),
        landmarkGeocodingParameters = {
            searchtext: landmarkTitle,
            jsonattributes: 1
        };

    geocoder.search(
        landmarkGeocodingParameters,
        generateMap,
        (e) => {
            console.log(e)
        }
    );
}

function generateMap(result) {
    let location = result.response.view[0].result[0].place.locations[0].displayPosition;
    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();
    // Instantiate (and display) a map object:
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map, {
            zoom: 15,
            center: {
                lat: location.latitude,
                lng: location.longitude
            }
        });

    let marker = new H.map.Marker({
        lat: location.latitude,
        lng: location.longitude
    });
    map.addObject(marker);

    let ui = H.ui.UI.createDefault(map, defaultLayers);
}

landmarkGeocode();