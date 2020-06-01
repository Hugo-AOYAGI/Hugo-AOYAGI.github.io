
let error_bait = 0;

let urls = ["../taupins", "../uimaker", "./taupins", "./taupins", "./taupins", "./taupins"]

$(document).ready(function () {
    setInterval(addChangingTitle, 3000);
    var j = 0;
    for (let card of $(".project-card")) {
        $(card).on("click", function () {
           window.location = urls[j];     
        });
        j++;
    }
    
});


var titles = ["Programming beginner", "Student in Classe Preparatoire"];
var i = 0;
function addChangingTitle () {
    i++;
    $(".title").css("opacity", 0);
    setTimeout(function () {
        $(".title").html(titles[i%titles.length]);
        $(".title").css("opacity", 1);
    }, 800);
} 

