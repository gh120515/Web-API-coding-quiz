

    // variables
let clear = document.getElementById("clear-button");


    // print highscores from localstorage (highscores is an array)
let highscores = JSON.parse(window.localStorage.getItem("highscores"));

function printHighscores() {
    // sort highscores from high to low
    highscores.sort(function(a, b) {
        return b.score - a.score
    });

    // append each highscore item in a list (li)
    highscores.forEach(function(score) {
    let highscoreListItem = document.createElement("li");
    highscoreListItem.textContent = score.initials + " = " + score.score;

    let highscoreList = document.getElementById("highscores");
    highscoreList.appendChild(highscoreListItem); 
    });

}

    // clear highscore in localstorage

function clearHighscore() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
};

clear.addEventListener("click", clearHighscore);