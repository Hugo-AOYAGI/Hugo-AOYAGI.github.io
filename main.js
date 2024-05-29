


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
        if (event.originalEvent.deltaY > 0) {
            scrolling += 100;
        }

        if (scrolling > 400) {
            changePage();
            scrolling = 0;
        } else {
            teasePage();
        }

        setTimeout(() => {
            scrolling = 0;
        }, 300)
    });

    // changePage();
    // changePage();
    // changePage();
    // changePage();

}



setup();