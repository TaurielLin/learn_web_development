$( "#sendAlertButton" ).click(function() {
    alert( "Handler for .click() called." );
});

$( "#readJsonButton" ).click(function() {
    console.log("Reading JSON");
    // https://catan-map-generator.herokuapp.com/api/map?jsonp=true
    // https://catan-map-generator.herokuapp.com/api/map

    var settings = {
        'cache': false,
        'dataType': "jsonp",
        "async": true,
        "crossDomain": true,
        "url": "https://catan-map-generator.herokuapp.com/api/legend?jsonp=true",
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.Harbors);
        drawTable(response.Harbors);
    });

});

function drawTable(data) {
    var tbody = $("<tbody />")
    $("#harborLegendTable").append(tbody);
    for (var i = 0; i < data.length; i++) {
        drawRow(tbody, data[i]);
    }
}

function drawRow(tbody, rowData) {
    var row = $("<tr />")
    tbody.append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.Name + "</td>"));
    row.append($("<td>" + rowData.Id + "</td>"));
}