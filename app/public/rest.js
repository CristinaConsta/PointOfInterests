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
    const response = await fetch(`/poi/${region}`);
    const poi_data = await response.json();
    return poi_data;
}

async function update_recomendations(button, region)
{
var poi_id=parseInt(button.id);
alert(region);
const response = await fetch(`/recom/${poi_id}`);
const result = await response.json();
if (result.success==1)
        alert("updated");

    var div = document.getElementById('show_data'); 
     div.remove();
/*
     var div = document.createElement('div');
         div.id = 'show_data'; 
         div.class="center" 
         div.style="width:100%; height:600px"
         document.body.appendChild(div);
*/
}


function print_details(data)
{
    var col = [];
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var num=1;
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 1; i < col.length-2; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 1; j < col.length-2; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[i][col[j]];
            }

            var btn = document.createElement("BUTTON");
            btn.id = data[i][col[9]].toString();
            //btn.id = data[i][col[10].toString();
            btn.innerHTML = "Update";
            btn.style.fontSize = "14px";
            btn.style.backgroundColor = '#4CAF50';
            btn.addEventListener('click', function (e) {
                    update_recomendations(this, "East Ham");
                }, false);
            tabCell.appendChild(btn);
            num=num+1
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.


     var div = document.createElement('div');
         div.id = 'show_data'; 
         div.class="center" 
         div.style="width:100%; height:600px"
         document.body.appendChild(div);

        var divContainer = document.getElementById("show_data");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
}


async function ajaxSearch(region) {
    //alert(`${region}`);
     const response = await fetch(`/poi/${region}`);
     const poi_data = await response.json();
     
     // Loop through the array of JSON objects and add the results to a <div>
     let latavg=0.0, lonavg=0.0;
     let html = "";
      poi_data.forEach ( location => {
         html += `${location.lat} ,  ${location.lon} <br />`;
            latavg=latavg+location.lat;
            lonavg=lonavg+location.lon;
     }
     );
     
     latavg=latavg/poi_data.length;
     lonavg=lonavg/poi_data.length;
     //document.getElementById('results').innerHTML = html;

     var div = document.getElementById('map1'); 
     div.remove();

     var div = document.createElement('div');
         div.id = 'map1'; 
         div.class="container-fluid" 
         div.style="width:100%; height:900px; margin-top:5px"
         document.body.appendChild(div);
     alert(latavg+","+lonavg)
     var map = L.map('map1').setView([latavg, lonavg], 14);
     mapLink =
     '<a href="http://openstreetmap.org">OpenStreetMap</a>';
     L.tileLayer(
     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; ' + mapLink + ' Contributors',
         maxZoom: 18,
     }).addTo(map);

     for ( var i=0; i < poi_data.length; i++ ) 
     {
     var marker = L.marker( [poi_data[i].lat, poi_data[i].lon] );
     var link='/review/'+poi_data[i].poi_id;
     marker.bindPopup('<a href="' + link + '" target="_blank" rel="noopener noreferrer nofollow ugc">' + poi_data[i].description + '</a>');   
     marker.addTo(map);
     }
print_details(poi_data);
                             }