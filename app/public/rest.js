//Create a table with the points of interest
function print_details(data)
{
    var col = ["#", "Name", "Type", "Country", "Region", "Description", "Recommendations", ""];
    var dataNames = ["poi_id", "name", "type", "country", "region", "description", "recomendations"];

    var num=1;
    var table = document.createElement("table");

    table.className = "table table-striped table-hover";

    //Create the table header
    var tr = table.insertRow(-1);
    for(var i=0; i<col.length; i++)
    {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }
    //Add the points of interest to the table
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j <= 6; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][dataNames[j]];
            if(j==6)
                tabCell.id="rec"+data[i][dataNames[0]].toString();
        }
    //Create the Recommend button
        var btn = document.createElement("BUTTON");
        btn.id = data[i][dataNames[0]].toString();
        btn.name = data[i][dataNames[4]].toString();
        btn.innerHTML = "Recommend";
        btn.className = "btn btn-outline-primary";
        btn.addEventListener('click', function(e){
            $.get(`/recomm/${parseInt(this.id)}`);
                        
            var recomm = parseInt($("#rec"+this.id).html());
            recomm++;
            $("#rec"+this.id).html(recomm);

        }, false);
        tabCell=tr.insertCell(-1);
        tabCell.appendChild(btn);

        num=num+1;
    }
    //Add the table to the page
    var div = document.createElement('div');
    div.id = 'show_data';
    div.class = "center";
    div.style = "width:100%;";
    $("#result").empty();
    $("#result").append(div);

    var divContainer = document.getElementById("show_data");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

//The REstAPI function for seraching by region
async function ajaxSearch(poi_data) 
{
//Find the middle coordinates between the points of interest
    let latavg = 0.0, lonavg = 0.0;
    let html = "";
    poi_data.forEach(location => {
        html += `${location.lat} ,  ${location.lon} <br />`;
        latavg = latavg + location.lat;
        lonavg = lonavg + location.lon;
    });

    latavg = latavg / poi_data.length;
    lonavg = lonavg / poi_data.length;

//Re-generate the map, zooming on the new coordinates
    var div = document.getElementById('map1');
    div.remove();

    var div = document.createElement('div');
    div.id = 'map1';
    div.class = "container-fluid"
    div.style = "width:100%; height:900px; margin-top:5px"
    document.body.appendChild(div);
    var map = L.map('map1').setView([latavg, lonavg], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

//Add the points of interest to the map
    for (var i = 0; i < poi_data.length; i++) {
        var marker = L.marker([poi_data[i].lat, poi_data[i].lon]);
        var link = '/review/' + poi_data[i].poi_id;
        marker.bindPopup('<a href="' + link + '" target="_blank" rel="noopener noreferrer nofollow ugc">' + poi_data[i].name + " - " + poi_data[i].description + '</a>');
        marker.addTo(map);
    }

    print_details(poi_data);

    map.on("click", onMapClick);

    function onMapClick(e)
    {
        window.location.href = "create-poi-map/"+e.latlng.lng+"/"+e.latlng.lat;
    }
}

