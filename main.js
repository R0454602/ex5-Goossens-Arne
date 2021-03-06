var express = require("express");
var parser = require("body-parser");

var dal = require("./devices.js");
var validation = require("./validate.js");

var app = express();
app.use(parser.json());


// opvangen van een GET op /devices
// device is geen student 
//maar meerdere devices betekent wel grotere groep

app.get("/devices", function(request, response) {
    response.send(dal.AllDevices());


// opvangen van een GET op devices/:id
app.get("/devices/:id", function(request, response) {
    var device = dal.findDevice(request.params.id);
    if (device) {
        response.send(device);
    } else {
        response.status(404).send();
    }
});


// opvangen van een POST
app.post("/devices", function(request, response) {
    // only data that matches with the variable 
    var device = request.body;

    // fill in the mandatory field(s)
    var errors = validation.fieldsNotEmpty(device, "mac_address_device", "time_captured", "distance");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    // id must be unique, mac_address_device can be filled in twice
    var existingDevice = dal.findDevice(device.mac_address_device);
    if (existingDevice) {
        response.status(409).send({
            message: "id must be unique, it's already registered",
            link: "../devices/" + existingDevice.id
        });
        return;
    }

    // every device has his own unique id
    device.id = uuid.v4();
    // device is stored in the data store 'dal'
    dal.saveDevice(device);
    // overwrite the default httpstatus (200) 
    response.status(201).location("../devices/" + device.id).send();
});


// opvangen van een GET op /locatie
app.get("/locatie", function (request, response) {
    "use strict";
    response.send(dallocatie.listAlllocatie());
});

app.get("/locatie/:id", function (request, response) {
    "use strict";
    var locatie = dallocatie.findlocatie(request.params.id);
    if (locatie) {
        response.send(locatie);
    } else {
        response.status(404).send();
    }
});

app.post("/locatie", function (request, response) {
    "use strict";
    var locatie = request.body; 

    var errors = validator.fieldsNotEmpty(locatie, "Lokaal", "Campus","Capaciteit");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existinglocatie = dallocatie.findlocatie(locatie.Naam);
    if (existinglocatie) {
        response.status(409).send({msg: "id must be unique, it's already registered", link: "../locaties/" + existinglocatie.id});
        return;
    }
    locatie.id = locatie.Naam;
    dalLocations.saveLocation(locatie);
    response.status(201).location("../locatie/" + locatie.id).send();
});

// opvangen van een GET op /les
app.get("/les", function (request, response) {
    "use strict";
    response.send(dallocatie.listAllles());
});

app.get("/les/:id", function (request, response) {
    "use strict";
    var les = dallocatie.findles(request.params.id);
    if (les) {
        response.send(les);
    } else {
        response.status(404).send();
    }
});

app.post("/les", function (request, response) {
    "use strict";
    var les = request.body; 

    var errors = validator.fieldsNotEmpty(les, "Vak", "Docent","Duur");
    if (errors) {
        response.status(400).send({msg: "Following field(s) are mandatory:" + errors.concat()});
        return;
    }

    var existingles = dallocatie.findles(les.Naam);
    if (existingles) {
        response.status(409).send({msg: "id must be unique, it's already registered", link: "../les/" + existingles.id});
        return;
    }
    les.id = les.Naam;
    dalLocations.saveLocation(les);
    response.status(201).location("../les/" + les.id).send();
});



app.listen(456789);
console.log("Server started");