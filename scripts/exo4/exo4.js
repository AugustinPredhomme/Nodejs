const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const fs = require('fs');
const path = require('path');

const scoresPath = path.join(__dirname, 'scores.txt');
let playerScore = 0;
let computerScore = 0;
let playerName = 'Player';

function startGame() {
    console.log('Bienvenue dans le jeu de Pierre-Feuille-Ciseau !');
    rl.question('Quel est votre nom ?\n', (name) => {
        playerName = name;
        console.log(`Bonne chance ${playerName} !`);
        playRound();
    })
}

function playRound() {
    rl.question('Choisissez pierre, feuille ou ciseau : ', (choice) => {
        const computerChoice = getComputerChoice();
        determineWinner(choice, computerChoice);
        askForNextRound();
    });
}

function getComputerChoice() {
    const choices = ['pierre', 'feuille', 'ciseau'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    console.log(`Vous avez choisi ${playerChoice}, l'ordinateur a choisi ${computerChoice}.`);

    if (playerChoice === computerChoice) {
        console.log('Égalité !');
    } else if (
        (playerChoice === 'pierre' && computerChoice === 'ciseau') ||
        (playerChoice === 'feuille' && computerChoice === 'pierre') ||
        (playerChoice === 'ciseau' && computerChoice === 'feuille')
    ) {
        playerScore++;
        console.log('Vous gagnez !');
    } else {
        computerScore++;
        console.log('L\'ordinateur gagne !');
    }
}

function updateScoreFile() {
    const score = `Ordinateur ${computerScore} - ${playerName} ${playerScore}`;
    fs.appendFileSync(scoresPath, score + '\n');
}

function askForNextRound() {
    if (playerScore + computerScore === 3) {
        console.log('\nFin de la partie !');
        displayFinalScore();
        updateScoreFile();
        rl.close();
    } else {
        console.log('\nScore actuel : Vous', playerScore, '-', computerScore, 'Ordinateur');
        playRound();
    }
}

function displayFinalScore() {
    if (playerScore > computerScore) {
        console.log('Vous avez gagné la partie !');
    } else if (playerScore < computerScore) {
        console.log('L\'ordinateur a gagné la partie !');
    } else {
        console.log('Match nul !');
    }
}

startGame();
  