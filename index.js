

var projects = {
    "Les Taupins": {
        "short-desc": "A mobile app to learn everything there is to know in PTSI/PT.",
        "long-desc": "A mobile app containing hundreds of questions to study for the PTSI/PT 'Classe Préparatoire'.",
        "thumbnail-name": "taupins",
        "langs": ["flutter", "dart", "js", "electron"],
        "type": "mobile",
        "github-link": "https://github.com/Hugo-AOYAGI/prepa_quiz_app",
        "license": "MIT",
        "website": "www.hugo-aoyagi.me/taupins",
        "links": ["Google Playstore Link", "https://play.google.com/store/apps/details?id=com.taupins.app"],
        "screenshots": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
    },
    
    "UI Maker": {
        "short-desc": "Python desktop app to create tkinter user interfaces in a heartbeat.",
        "long-desc": "A tkinter app where you can place widgets on the screen and change all of their properties, then let the program write the code for it with the click of a button.",
        "thumbnail-name": "ui_maker",
        "langs": ["python", "tkinter"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/Python-Tkinter-UI-Maker",
        "license": "MIT",
        "website": "",
        "links": [],
        "screenshots": ["1.png", "2.png"]
    },
    
    "ReMind": {
        "short-desc": "A Todo App i built to learn electron.",
        "long-desc": "An electron application where you can create tasks, create a schedule and get notified before an important event.",
        "thumbnail-name": "remind",
        "langs": ["electron", "js", "html", "sass"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/ToDoApp",
        "license": "MIT",
        "website": "",
        "links": [],
        "screenshots": ["1.png", "2.png", "3.png"]
    },
    
    "Life On Mars": {
        "short-desc": "A game created for a school project.",
        "long-desc": "A game built with pygame where you play a rover on Mars trying to make its way through the dangers of the red planet. It comes with a race against an AI.",
        "thumbnail-name": "life_on_mars",
        "langs": ["python", "tkinter", "pygame"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/Life-on-mars-game",
        "license": "MIT",
        "website": "",
        "links": [],
        "screenshots": ["1.png", "2.png", "3.png"]
    },
    
    "Personal Website": {
        "short-desc": "The website you are browsing.",
        "long-desc": "A website that contains some featured programming projects I've done throughout the years as well as some ways to contact me.",
        "thumbnail-name": "personal_website",
        "langs": ["html", "js"],
        "type": "web",
        "github-link": "https://github.com/Hugo-AOYAGI/Hugo-AOYAGI.github.io",
        "license": "MIT",
        "website": "www.hugo-aoyagi.me",
        "links": [],
        "screenshots": ["1.png", "2.png", "3.png"]
    }

};


var selected_image_index = 1;
var curr_screenshots_number = 0;


$(document).ready(() => {
  var projects_container = document.getElementById("projects_container");
    
    Object.keys(projects).forEach((title) => {
        
    let node = document.createElement("div");
    node.classList.add("project-card");
    node.innerHTML = `
              <img src="assets/thumbnails/${projects[title]["thumbnail-name"]}.png" alt="" class="project-background">
              <div class="project-name-wrapper">
                   <div class="project-name">
                       ${title.toUpperCase()}
                   </div>
                   <div class="project-short-desc">
                       ${projects[title]["short-desc"]}
                   </div>
              </div>`;
        
        
    node.addEventListener("click", () => {
       $(".selected-project-container").css("display", "unset");
        
        // Changing every elements
        $(".upper-title").html(title.toUpperCase());
        $(".long-desc").html(projects[title]["long-desc"]);
        
        if (projects[title]["website"] == "") {
            $(".website-link").css("display", "none");
        } else {
            $(".website-link").css("display", "flex");
            $(".website-link").html(`<img src="assets/web_icon.png" alt="" class="web-icon"><a href="https://${projects[title]["website"]}">${projects[title]["website"]}</a>`);
        }
        
        if (projects[title]["links"] == "") {
            $(".other-links").css("display", "none");
        } else {
            $(".other-links").css("display", "flex");
            $(".other-links").html(`<img src="assets/link_icon.png" alt="" class="link-icon">
                <a href="${projects[title]["links"][1]}">${projects[title]["links"][0]}</a>`);
        }
        
        let string = "";
        
        for (let lang of projects[title]["langs"]) {
            string += `<img src="assets/langs/${lang}.png" alt="${lang}">`
        }
        
        $(".lang-icons").html(string);
        
        $(".github-icon-a").attr("href", projects[title]["github-link"]);
        
        $(".application-type-icon").attr("src", "assets/" + projects[title]["type"] +".svg");
        
        // Creating carousel and its images
        $(".sel-proj-images-container").html("");
        $(".sel-proj-carousel-btns").html("");
        
        let images_string = "";
        curr_screenshots_number = projects[title]["screenshots"].length;
        for (let i = 0; i < projects[title]["screenshots"].length; i++) {
            // Images
            let image_node = $(`<img src="assets/screenshots/${projects[title]["thumbnail-name"] + "/" + projects[title]["screenshots"][i]}" alt="" class="carousel-image" id="img-${(i+1).toString()}">`);
            if (i == 0) image_node.addClass("selected-carousel-image");
            $(".sel-proj-images-container").append(image_node);
            
            
            // Buttons
            let btn_node = $(`<div class="carousel-btn" id="btn-${(i+1).toString()}"></div>`);
            if (i == 0) btn_node.addClass("carousel-btn-selected");
            btn_node.on("click", () => {
                
                
                $("#img-" + selected_image_index.toString()).removeClass("selected-carousel-image");
                $("#btn-" + selected_image_index.toString()).removeClass("carousel-btn-selected");
                
                selected_image_index = (i+1);
                
                
                $("#img-" + (i+1).toString()).addClass("selected-carousel-image");
                $("#btn-" + (i+1).toString()).addClass("carousel-btn-selected");
            });
            $(".sel-proj-carousel-btns").append(btn_node);
            
            
        }
        
    });
        
        
    projects_container.appendChild(node);
    }); 
    
    $(".sel-proj-close-btn").on("click", () => {
        $(".selected-project-container").css("display", "none");
        selected_image_index = 1;
    });
    
    $(".sel-proj-close-btn-black").on("click", () => {
        $(".selected-project-container").css("display", "none");
        selected_image_index = 1;
    });
    
    $(".carousel-left-arrow").on("click", () => {
        $("#img-" + selected_image_index.toString()).removeClass("selected-carousel-image");
        $("#btn-" + selected_image_index.toString()).removeClass("carousel-btn-selected");

        selected_image_index = selected_image_index == 1 ? curr_screenshots_number : selected_image_index - 1 ;


        $("#img-" + selected_image_index.toString()).addClass("selected-carousel-image");
        $("#btn-" + selected_image_index.toString()).addClass("carousel-btn-selected");
    });
    
    $(".carousel-right-arrow").on("click", () => {
        $("#img-" + selected_image_index.toString()).removeClass("selected-carousel-image");
        $("#btn-" + selected_image_index.toString()).removeClass("carousel-btn-selected");

        selected_image_index = selected_image_index == curr_screenshots_number ? 1 : selected_image_index + 1;


        $("#img-" + selected_image_index.toString()).addClass("selected-carousel-image");
        $("#btn-" + selected_image_index.toString()).addClass("carousel-btn-selected");
    });
})