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
        "url": "https://catan-map-generator.herokuapp.com/api/map?jsonp=true",
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log(response.GameType);
        console.log(response.Board);
        drawTable(response.Board);
    });

});

function drawTable(data) {
    var tbody = $("<tbody />")
    $("#landscapeMapTable").append(tbody);
    for (var i = 0; i < data.a.length; i++) {
        drawRow(tbody, data.a[i]);
        var polygonId = "a" + i;
        var landscapeType = data.a[i].Landscape;
        updatePolygon(polygonId,landscapeType);
    }
}

function drawRow(tbody, rowData) {
    var row = $("<tr />")
    tbody.append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.Landscape + "</td>"));
    row.append($("<td>" + rowData.Number.Number + "</td>"));
}

function updatePolygon(polygonId,landscapeType) {
    var fillUpdate = getFillForLandscapeType(landscapeType);
    console.log("updating polygon id:"+polygonId+", to fill："+fillUpdate);
    $("#"+polygonId).attr('fill',fillUpdate);
}

function getFillForLandscapeType(landscapeType) {
    switch(landscapeType) {
        case 0: return "url(#desert)";
        break;
        case 1: return "url(#forest)";
        break;
        case 2: return "url(#pasture)";
        break;
        case 3: return "url(#field)";
        break;
        case 4: return "url(#river)";
        break;
        case 5: return "url(#mountain)";
        break;
    }
}