$(document).ready(function() {
    // const username = $('#username');
    const finalScore = $('#finalScore');
    const highScore = JSON.parse(localStorage.getItem('highScore'));
    const mostRecentScore = localStorage.getItem('mostRecentScore')

    finalScore.text(mostRecentScore);

    $('#username').keyup(function () { 
        saveScoreBtn.disabled = !username.value;
    });

 $('#saveScoreBtn').click(function (e) {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScore.push(score);
    highScore.sort((a,b) => b.score - a.score);
    highScore.splice(5);
    localStorage.setItem('highscore', JSON.stringify(highScore));
    window.location.assign('/');
 });
});