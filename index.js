

var projects = {
    "Les Taupins": {
        "short-desc": "A mobile app to learn everything there is to know in PTSI/PT.",
        "thumbnail-name": "taupins",
        "langs": ["flutter", "dart", "js", "electron"],
        "type": "mobile",
        "github-link": "https://github.com/Hugo-AOYAGI/prepa_quiz_app",
        "license": "MIT",
        "website": "www.hugo-aoyagi.me/taupins",
        "links": ["https://play.google.com/store/apps/details?id=com.taupins.app"]
    },
    
    "UI Maker": {
        "short-desc": "Python desktop app to create tkinter user interfaces in a heartbeat.",
        "thumbnail-name": "ui_maker",
        "langs": ["python", "tkinter"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/Python-Tkinter-UI-Maker",
        "license": "MIT",
        "website": "",
        "links": []
    },
    
    "ReMind": {
        "short-desc": "A Todo App i built to learn electron.",
        "thumbnail-name": "remind",
        "langs": ["electron", "js", "html", "sass"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/ToDoApp",
        "license": "MIT",
        "website": "",
        "links": []
    },
    
    "Life On Mars": {
        "short-desc": "A game created for a school project.",
        "thumbnail-name": "life_on_mars",
        "langs": ["python", "tkinter", "pygame"],
        "type": "desktop",
        "github-link": "https://github.com/Hugo-AOYAGI/Life-on-mars-game",
        "license": "MIT",
        "website": "",
        "links": []
    },
    
    "Personal Website": {
        "short-desc": "The website you are browsing.",
        "thumbnail-name": "personal_website",
        "langs": ["html", "js"],
        "type": "web",
        "github-link": "https://github.com/Hugo-AOYAGI/Hugo-AOYAGI.github.io",
        "license": "MIT",
        "website": "www.hugo-aoyagi.me",
        "links": []
    }

};





document.addEventListener('DOMContentLoaded', function(){ 
    
    var projects_container = document.getElementById("projects_container");
    
    Object.keys(projects).forEach((title) => {
        
    let node = document.createElement("div");
    node.innerHTML = `<div class="project-card">
              <img src="assets/thumbnails/${projects[title]["thumbnail-name"]}.png" alt="" class="project-background">
              <div class="project-name-wrapper">
                   <div class="project-name">
                       ${title.toUpperCase()}
                   </div>
                   <div class="project-short-desc">
                       ${projects[title]["short-desc"]}
                   </div>
              </div>
        </div>`;
        
    projects_container.appendChild(node);
    });
}, false);

