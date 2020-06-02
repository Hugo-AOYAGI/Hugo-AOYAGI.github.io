
let error_bait = 0;

let urls = ["./taupins", "./uimaker", "./404.html", "./404.html", "./404.html", "./404.html"]

$(document).ready(function () {
    setInterval(addChangingTitle, 3000);
    addLangsLinks();
    var j = 0;
    for (let card of $(".project-card")) {
        $(card).on("click", function () {
          window.location = urls[$(".project-card").index($(this))];
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

function addLangsLinks() {
   $(".tk").on("click", function() {
       window.location = "https://docs.python.org/3/library/tkinter.html";
   }); 
    
   $(".py").on("click", function() {
       window.location = "https://www.python.org/";
   });
    
    $(".flutter").on("click", function() {
       window.location = "https://flutter.dev/";
   });
    
    $(".dart").on("click", function() {
       window.location = "https://dart.dev/";
   });
    
    $(".dart").on("click", function() {
       window.location = "https://www.electronjs.org/";
   });
}

