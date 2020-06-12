var xhttp;
var data;
var i=0;
var current_date = new Date();
var years = current_date.getFullYear();
var months = current_date.getMonth();
var dates = current_date.getDate();
    

var country_index=0;
if (window.XMLHttpRequest) {
     // code for modern browsers
xhttp = new XMLHttpRequest();
} else {
    // code for IE6, IE5
xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    
    searchFunction();
    
   console.log(data.Global.TotalConfirmed);
   }
  
};
xhttp.open("GET", "https://api.covid19api.com/summary", true);
xhttp.send();  

 


function searchFunction(){
    document.getElementById("date").innerHTML = dates + "/" + months + "/" + years;
    
    var country_name = document.getElementById("country").value;
    if (country_name== "Global"){
         document.getElementById("total_affected").innerHTML = data.Global.TotalConfirmed; 
         document.getElementById("total_death").innerHTML =data.Global.TotalDeaths;
         document.getElementById("total_recovery").innerHTML = data.Global.TotalRecovered;
         document.getElementById("new_affected").innerHTML = data.Global.NewConfirmed ;
         document.getElementById("new_death").innerHTML = data.Global.NewDeaths;
         document.getElementById("new_recovery").innerHTML = data.Global.NewRecovered;
     
    }
    else{
        for(i;i<(data.Countries.length - 1);i++){
            if (data.Countries[i].Country == country_name){
               country_index = i;
               break;
            }
            
        } 
        if(data.Countries[i].Country != country_name){
            alert("No data found");
            location.reload();
        }
        document.getElementById("total_affected").innerHTML = data.Countries[country_index].TotalConfirmed;
        document.getElementById("total_death").innerHTML =data.Countries[country_index].TotalDeaths;
        document.getElementById("total_recovery").innerHTML = data.Countries[country_index].TotalRecovered;
        document.getElementById("new_affected").innerHTML = data.Countries[country_index].NewConfirmed ;
        document.getElementById("new_death").innerHTML = data.Countries[country_index].NewDeaths;
        document.getElementById("new_recovery").innerHTML = data.Countries[country_index].NewRecovered;
    }
    
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }