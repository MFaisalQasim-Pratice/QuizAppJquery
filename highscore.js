const highScore = JSON.parse(localStorage.getItem('highScore')) || [];
const scoreList = [];

for (let index = 0; index <= 4; index++) {
    const score = highScore[index];
        scoreList[index] = `<li class="high-score">${score.name}-${score.score}</li>`;
}
// alert(scoreList);
$('#highscoreList').html(scoreList);