
let error_bait;

$(document).ready(function () {
    setInterval(addChangingTitle, 3000);
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
