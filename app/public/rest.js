function get_id()
{
alert("Hi!");
table = document.getElementById("rev");
tr = table.getElementsByTagName("tr");
var poi_id = tr[1].getElementsByTagName("td")[2];
alert(poi_id);
}

async function fetch_poi(region)
{
    const response = await fetch(`/create-poi/${region}`);
    const poi_data = await response.json();
    return poi_data;
}

async function update_recomendations(button, region) 
{
    var poi_id = parseInt(button.id);
    const response = await fetch(`/recomm/${poi_id}`);
    const result = await response.json();
    if (result.success == 1);
        //alert("updated");

    ajaxSearch(region, window.document);
}


function print_details(data/*, doc*/)
{
    var col = ["#", "Name", "Type", "Country", "Region", "Description", "Recommendations", ""];
   /* var dataNames = [];
    for (var i = 0; i < data.length; i++) {
        for (var key in data[i]) {
            if (dataNames.indexOf(key) === -1) {
                dataNames.push(key);
            }
        }
    }*/

    var dataNames = ["poi_id", "name", "type", "country", "region", "description", "recomendations"];

    var num=1;
    var table = document.createElement("table");

    table.className = "table table-striped table-hover";

    var tr = table.insertRow(-1);
    for(var i=0; i<col.length; i++)
    {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j <= 6; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][dataNames[j]];
        }

        var btn = document.createElement("BUTTON");
        btn.id = data[i][dataNames[0]].toString();
        btn.name = data[i][dataNames[4]].toString();
        btn.innerHTML = "Recommend";
        btn.className = "btn btn-outline-primary";
        btn.addEventListener('click', function(e){
            update_recomendations(this, this.name);
        }, false);
        tabCell=tr.insertCell(-1);
        tabCell.appendChild(btn);

        num=num+1;
    }
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
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


async function ajaxSearch(region/*, doc*/) {

    const response = await fetch(`/create-poi/${region}`);
    const poi_data = await response.json();

    // if(poi_data.length==0)
    //     return;
    // else
    //     console.log(poi_data);

    // Loop through the array of JSON objects and add the results to a <div>
    let latavg = 0.0, lonavg = 0.0;
    let html = "";
    poi_data.forEach(location => {
        html += `${location.lat} ,  ${location.lon} <br />`;
        latavg = latavg + location.lat;
        lonavg = lonavg + location.lon;
    }
    );

    latavg = latavg / poi_data.length;
    lonavg = lonavg / poi_data.length;
    //  document.getElementById('results').innerHTML = html;

    var div = document.getElementById('map1');
    div.remove();

    var div = document.createElement('div');
    div.id = 'map1';
    div.class = "container-fluid"
    div.style = "width:100%; height:900px; margin-top:5px"
    document.body.appendChild(div);
    //alert(latavg + "," + lonavg)
    var map = L.map('map1').setView([latavg, lonavg], 14);
    mapLink =
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);

    for (var i = 0; i < poi_data.length; i++) {
        var marker = L.marker([poi_data[i].lat, poi_data[i].lon]);
        var link = '/review/' + poi_data[i].poi_id;
        marker.bindPopup('<a href="' + link + '" target="_blank" rel="noopener noreferrer nofollow ugc">' + poi_data[i].name + " - " + poi_data[i].description + '</a>');
        marker.addTo(map);
    }
    print_details(poi_data/*, doc*/);

    map.on("click", onMapClick);

    function onMapClick(e)
    {
        //createPOIFromMap(e.latlng.lng, e.latlng.lat);
        window.location.href = "create-poi-map/"+e.latlng.lng+"/"+e.latlng.lat;
    }
}

exports.module = {ajaxSearch};