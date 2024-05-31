


titles_left =   [ "Hugo",   "My",         "Work",        "Personal",   "Skills",   "Contact"]
titles_right =  ["Aoyagi",  "Education",  "Experience",  "Projects",   "Hobbies",  "Me"]
texts =                    ["Education", "Work Experience", "Personal projects", "Skills & Hobbies", "Contact Me"]

ribbon_widths = [0.25,      0.25,         0.25,          0.25,         0.6,        0.2]
ribbon_lefts =  [0.55,      0.2,          0.4,           0.2,          0.2,        0.45]

page_cls = ["hero-page", "education-page", "work-page", "project-page", "skill-page"]

let pageIndex = 0

let scrolling = 0

let currentImg = 1;
let timeout;

let currentProject = 0;

let scrollTimeout;

let pageChanging = false;


let projects = [
    {
        "title": "Les Taupins",
        "id": "taupins",
        "description": "An application I built during “classes préparatoires” to assist myself and my classmates to train for exams through simple quizzes which cover various scientific subjects.",
        "images": ["1.png", "2.png", "3.png"],
        "type": "mobile",
        "techs": [["flutter", "Flutter"], ["js", "JavaScript (Backend)"]],
        "link": "https://github.com/Hugo-AOYAGI/prepa_quiz_app",
        "thumbnail": "taupins.png"
    },
    {
        "title": "Formula Checker",
        "id": "formula-checker",
        "description": "This website allows you to type any formula you wish, specify the dimension of every variable and checks you are not adding length and time for instance.",
        "images": ["1.png", "2.png", "3.png"],
        "type": "web",
        "techs": [["react", "React"], ["js", "JavaScript"]],
        "link": "https://github.com/Hugo-AOYAGI/formula-checker",
        "thumbnail": "formula_checker.png"
    },
    {
        "title": "Tkinter UI Maker",
        "id": "ui-maker",
        "description": "A tkinter app where you can place widgets on the screen and change all of their properties, then let the program write the code for it with the click of a button.",
        "images": ["1.png", "2.png"],
        "type": "desktop",
        "techs": [["python", "Python & Tkinter"]],
        "link": "https://github.com/Hugo-AOYAGI/Python-Tkinter-UI-Maker",
        "thumbnail": "ui_maker.png"
    }

] 

const TYPE_STRINGS = {"mobile": "Mobile Application", "web": "Web Application", "desktop": "Desktop Application"} 



let projectTemplate = (project) => {
    return `
        <div class="project" id="${project.id}">
            <div class="thumbnail">
                <img src="assets/thumbnails/${project.thumbnail}" alt="">
            </div>
                
            <div class="tag-box">
                <div class="type-row">
                    <img src="assets/types/${project.type}.svg">
                    ${TYPE_STRINGS[project.type]}
                </div>
                <div class="lang-row">
                    ${
                        project.techs.map(tech => {
                            return `<div class="lang">
                                <img src="assets/langs/${tech[0]}.svg">
                                <span>${tech[1]}</span>
                            </div>`
                        }).join("")
                    }
                </div>
            </div>

            <div class="check-it">
                <img src="assets/icons/github.svg" alt="">
                <a href="${project.link}">Check it out !</a>
            </div>

            <div class="project-desc">
                ${project.description}
            </div>
        </div> 
    `
}

let setup = () => {

    console.log("Setting up Website...")

    let left = $(".left-col")
    let right = $(".right-col")

    let ribbon = $(".ribbon")

    let nav = $(".nav-titles")
    let navProgress = $(".nav-progress-fill")

    for (let i = 0; i < titles_left.length; i++) {
        left.append(`<div class="title-word" id="${titles_left[i]}">${titles_left[i].split('').join("</br>")}</div>`)
    }

    for (let i = 0; i < titles_right.length; i++) {
        right.append(`<div class="title-word" id="${titles_right[i]}">${titles_right[i].split('').join("</br>")}</div>`)
    }

    for (let i = 0; i < titles_left.length - 1; i++) {
        nav.append(`<div class="nav-title" id="nav-title-${i + 1}">${texts[i]}</div>`)
    }



    let setTitleOpacity = () => {

        for (let i = 0; i < titles_left.length; i++) {
            if (pageIndex != i) {
                $(`#${titles_left[i]}`).css("opacity", "0.05")
                $(`#${titles_right[i]}`).css("opacity", "0.05")
            } else {
                $(`#${titles_left[i]}`).css("opacity", "1")
                $(`#${titles_right[i]}`).css("opacity", "1")
            
            }
        }
    }

    let setNavProgress = () => {
        navProgress.css("height", `${(pageIndex / (titles_left.length - 1)) * 100}%`)
        $(`#nav-title-${pageIndex}`).addClass("selected")
        if (pageIndex > 0) {
            $(`#nav-title-${pageIndex - 1}`).removeClass("selected")
        }

    }

    let setRibbon = () => {
        ribbon.css("width", `${ribbon_widths[pageIndex] * 100}%`)
        ribbon.css("left", `${ribbon_lefts[pageIndex] * 100}%`)
    }

    let changePage = () => {

        pageIndex += 1

        if (pageIndex >= titles_left.length) {
            pageIndex = 0
        }

        if (pageIndex == 0) {
            $(".nav-title").removeClass("selected")
        }

        let heightLeft = 0
        let heightRight = 0
        for (let i = 0; i < pageIndex; i++) {
            heightLeft += $(`#${titles_left[i]}`).height()
            heightRight += $(`#${titles_right[i]}`).height()
        }

        margin = .55 * pageIndex - 0.25 * (pageIndex != 0)

        $("#Hugo").css("margin-top", `calc(-${heightLeft}px - ${margin}em)`)
        $("#Aoyagi").css("margin-top", `calc(-${heightRight}px - ${margin}em)`)

        $(`.${page_cls[pageIndex - 1]}`).css("top", "-100%")
        $(`.${page_cls[pageIndex - 1]}`).css("opacity", "0")

        setTimeout(() => {
            $(`.${page_cls[pageIndex]}`).css("top", "0%")
        }, 100)

        setTitleOpacity();
        setRibbon();
        setNavProgress();

    }

    let teasePage = () => {
        $(`.${page_cls[pageIndex]}`).css("top", "-2%")

        setTimeout(() => {
            $(`.${page_cls[pageIndex]}`).css("top", "0%")
        }, 200)
    }

    let projectsCarouselSetup = () => {

        $(".prev").on("click", () => {
            clearTimeout(timeout);
            currentImg--;
            updateImg();
        });

        $(".next").on("click", () => {
            clearTimeout(timeout);
            currentImg++;
            updateImg();
        });

        let updateImg = () => {

            imgEls = $('.image-container img');

            console.log(imgEls.length)

            if (currentImg > imgEls.length) {
                currentImg = 1;
            } else if (currentImg < 1) {
                currentImg = imgEls.length;
            }

            $(".image-container").css("transform", `translateX(-${(currentImg - 1) * 100}%)`);
            timeout = setTimeout(() => {
                currentImg++;
                updateImg();
            }, 3000);
        }

        updateImg();

    }

    projectsCarouselSetup();

    setTitleOpacity();


    $(document).on('wheel', function(event) {
        // Check if the user is scrolling
        console.log("a")

        if (pageChanging) {
            return;
        }

        if (event.originalEvent.deltaY > 0) {
            scrolling += 100;
        }

        if (scrolling > 200) {
            changePage();
            pageChanging = true;
            clearTimeout(scrollTimeout);
            scrolling = 0;
            setTimeout(() => {
                pageChanging = false;
            }, 1000)
        } else {
            teasePage();
        }

        scrollTimeout = setTimeout(() => {
            scrolling = 0;
        }, 300)
    });

    

    let setupProjects = () => {
        let projects_info = $(".info-ribbon-wrap");
        let titles = $(".title-carousel");

        projects.forEach(project => {
            projects_info.append(projectTemplate(project));
            titles.append(`<div class="title" id="${project.id}-title">${project.title}</div>`);
        })

        $(`#${projects[0].id}`).addClass("selected");
        $(`#${projects[0].id}-title`).addClass("selected");

        setTitlePosition(0)


    }

    let setTitlePosition = (i) => {

        width_before = 0;
        for (let j = 0; j < i; j++) {
            width_before += $(`#${projects[j].id}-title`).width();
        }
        width = $(`#${projects[i].id}-title`).width();

        $(`#${projects[0].id}-title`).css("margin-left", `calc(50% - ${width_before + width / 2}px)`)

    }

    $(".title-next").on("click", () => {
        if (currentProject >= projects.length - 1) {
            return;
        } 
        currentProject++;
        $(`#${projects[currentProject - 1].id}`).removeClass("selected").addClass("passed");
        $(`#${projects[currentProject].id}`).addClass("selected");

        $(`#${projects[currentProject - 1].id}-title`).removeClass("selected");	
        $(`#${projects[currentProject].id}-title`).addClass("selected");

        setTitlePosition(currentProject)

    });

    $(".title-prev").on("click", () => {
        if (currentProject <= 0) {
            return;
        } 
        currentProject--;
        $(`#${projects[currentProject + 1].id}`).removeClass("selected");
        $(`#${projects[currentProject].id}`).removeClass("passed").addClass("selected");

        $(`#${projects[currentProject + 1].id}-title`).removeClass("selected");	
        $(`#${projects[currentProject].id}-title`).addClass("selected");

        setTitlePosition(currentProject)

    });


    setupProjects();


    // changePage();
    // changePage();
    // changePage();
    // changePage();

}



setup();