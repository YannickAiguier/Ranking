let discipline = "men-singles";
$("h1").text(discipline.toUpperCase());
let flag = {
    CHN: "china", DEN: "denmark", ENG: "england", FRA: "france", GER: "germany", HKG: "hong-kong",
    IND: "india", INA: "indonesia", JPN: "japan", KOR: "korea", MAS: "malaysia", ESP: "spain",
    TPE: "taipei", THA: "thailand"
};


$(document).ready(function () {

    // appel de la fonction home pour afficher les infos de la page d'accueil
    home();

    // gestion des clic sur les boutons de choix de discipline :
    // on efface le feed existant puis
    // on rappelle la fonction home pour recréer l'affichage à jour
    $("#btn-ms").on("click", function () {
        $("article").remove();
        discipline = "men-singles";
        home();
    })
    $("#btn-ws").on("click", function () {
        $("article").remove();
        discipline = "women-singles";
        home();
    })
    $("#btn-md").on("click", function () {
        $("article").remove();
        discipline = "men-doubles";
        home();
    })
    $("#btn-wd").on("click", function () {
        $("article").remove();
        discipline = "women-doubles";
        home();
    })
    $("#btn-mx").on("click", function () {
        $("article").remove();
        discipline = "mixed-doubles";
        home();
    })

    // clic sur le bouton menu : affiche/masque le menu
    $(".menu__btn").on("click", function () {
        toggleMenu();
    })

    // la souris quitte le menu : il disparait
    $(".menu-content").on("mouseout", function () {
        toggleMenu();
    })
});

// fonction qui défini l'url de l'api et appelle la fonction getData
function home() {
    $("h1").text('');
    $(".loader").removeClass("hide");
    let myUrl = "https://bwf-api.herokuapp.com/api/" + discipline;
    getData(myUrl);
}

// fonction qui fait la requête API puis appelle la fonction de traitement des données
function getData(apiUrl) {
    $.ajax({
        url: apiUrl,
    })
        .done(function (response) {
            showResult(response);
        })
        .fail(function (error) {
            console.log("Erreur !");
            console.log(error);
        })
}

// fonction qui crée le feed
function showResult(data) {
    $("h1").text(discipline.toUpperCase());
    let newArticle = ("<article>");
    $("h1").after(newArticle);
    data.forEach(entity => {
        createFeedElement(entity);
    });
    $(".loader").addClass("hide");
}

// fonction qui crée un élément du feed
function createFeedElement(element) {
    let newSection = ("<section>");
    $("article").append(newSection);
    let newH2 = ("<h2>");
    $("section:last").append(newH2);
    $("h2:last").text(`${element.rank}. ${element.name}`);
    let newDiv = ("<div>");
    $("section:last").append(newDiv);
    let newImg = ("<img>");
    $("section:last div").append(newImg).addClass("points");
    $("section:last img").attr("src", "./images/drapeaux/" + flag[element.country] + ".svg").addClass("flag");
    let newP = ("<p>");
    $("section:last div").append(newP);
    $("section:last p:last").text(`${element.points} points`);
}