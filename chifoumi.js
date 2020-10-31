// Script du Chifoumi

function runGame() {
    // Contenu HTML
    const userAnswer = document.getElementById('user-answer').value.toLowerCase(); // Comparaison insensible à la casse
    const gameInfo = document.getElementById('game-info');
    const userIcon = document.getElementById('user-icon');
    const computerIcon = document.getElementById('computer-icon');
    const gameBoard = document.getElementsByTagName('h2');
    let gameFinalMessage = document.getElementById('game-final-message');

    // Traitement du score en cours affiché (str to int)
    let userScore = document.getElementById('user-score').textContent;
    let computerScore = document.getElementById('computer-score').textContent;
    userScore = Number.parseInt(userScore);
    computerScore = Number.parseInt(computerScore);

    // Réinitialise tout au lancement d'un nouveau tour
    gameInfo.style.opacity = '1';
    userIcon.innerHTML = '';
    computerIcon.innerHTML = '';
    gameFinalMessage.innerHTML = '';

    // Computer choisit une des 3 possibilités
    const wordsList = ['pierre', 'feuille', 'ciseaux'];
    computerChoice = wordsList[Math.floor(Math.random() * wordsList.length)]; // Accède à un élément random de l'array wordsList

    // Le jeu commence
    gameInfo.innerHTML = '<p id="game-waiting-answer">Voyons voir...</p>';

    // Si la réponse de l'utilisateur est valide le tour se lance
    if (userAnswer === 'pierre' || userAnswer === 'feuille' || userAnswer === 'ciseaux') {
        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-ok-answer">OK c\'est parti !</p>';

            // Le tableau de jeu apparaît (modifie opacity des h2 à 1)
            for (value of gameBoard) {
                value.style.opacity = '1';
            }
        }, 1200);

        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-ok-answer">Chi...</p>';
        }, 2500);

        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-ok-answer">Fou...</p>';
        }, 3500);

        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-ok-answer">Mi !</p>';

            // L'icône change selon les choix
            if (userAnswer === 'pierre') {
                userIcon.innerHTML = '<i class="fas fa-hand-rock"></i>';
            }

            if (userAnswer === 'feuille') {
                userIcon.innerHTML = '<i class="fas fa-hand-paper"></i>';
            }

            if (userAnswer === 'ciseaux') {
                userIcon.innerHTML = '<i class="fas fa-hand-scissors"></i>';
            }

            if (computerChoice === 'pierre') {
                computerIcon.innerHTML = '<i class="fas fa-hand-rock"></i>';
            }

            if (computerChoice === 'feuille') {
                computerIcon.innerHTML = '<i class="fas fa-hand-paper"></i>';
            }

            if (computerChoice === 'ciseaux') {
                computerIcon.innerHTML = '<i class="fas fa-hand-scissors"></i>';
            }
        }, 4500);

        // Affichage du résultat selon les choix
        setTimeout(function () {
            gameInfo.style.opacity = '0'; // "Mi !" disparait

            if (userAnswer === 'pierre') {
                switch (computerChoice) {
                    case 'pierre':
                        gameFinalMessage.innerHTML = 'Égalité ! &#128561; Allez retente ! &#128516;';
                        break;
                    case 'feuille':
                        gameFinalMessage.innerHTML = 'Oooh c\'est perdu... &#128557; Rejoue encore ! &#128516;';
                        computerScore++;
                        document.getElementById('computer-score').innerText = computerScore;
                        break;
                    case 'ciseaux':
                        gameFinalMessage.innerHTML = 'YEAH c\'est gagné ! &#129311;&#128170; Tu relances ? &#128526;';
                        userScore++;
                        document.getElementById('user-score').innerText = userScore;
                        break;
                }
            }

            if (userAnswer === 'feuille') {
                switch (computerChoice) {
                    case 'feuille':
                        gameFinalMessage.innerHTML = 'Égalité ! &#128561; Allez retente ! &#128516;';
                        break;
                    case 'ciseaux':
                        gameFinalMessage.innerHTML = 'Oooh c\'est perdu... &#128557; Rejoue encore ! &#128516;';
                        computerScore++;
                        document.getElementById('computer-score').innerText = computerScore;
                        break;
                    case 'pierre':
                        gameFinalMessage.innerHTML = 'YEAH c\'est gagné ! &#129311;&#128170; Tu relances ? &#128526;';
                        userScore++;
                        document.getElementById('user-score').innerText = userScore;
                        break;
                }
            }

            if (userAnswer === 'ciseaux') {
                switch (computerChoice) {
                    case 'ciseaux':
                        gameFinalMessage.innerHTML = 'Égalité ! &#128561; Allez retente ! &#128516;';
                        break;
                    case 'pierre':
                        gameFinalMessage.innerHTML = 'Oooh c\'est perdu... &#128557; Rejoue encore ! &#128516;';
                        computerScore++;
                        document.getElementById('computer-score').innerText = computerScore;
                        break;
                    case 'feuille':
                        gameFinalMessage.innerHTML = 'YEAH c\'est gagné ! &#129311;&#128170; Tu relances ? &#128526;';
                        userScore++;
                        document.getElementById('user-score').innerText = userScore;
                        break;
                }
            }
        }, 6000);

        // Test des scores : si partie terminée message final
        setTimeout(function () {
            if (userScore === 3) {
                gameFinalMessage.innerHTML = 'Victoire !';
            }

            if (computerScore === 3) {
                gameFinalMessage.innerHTML = 'Perdu !';
            }
        }, 6000);

        // Puis préviens et relance nouvelle partie
        setTimeout(function () {
            if (userScore === 3) {
                alert("Bravo à toi ! \nTu as gagné le droit de rejouer !");
                document.location.reload();
            }

            if (computerScore === 3) {
                alert("C'est perdu... \nMais ce n'est pas grave car tout ce qui ne tue pas rend plus fort !");
                document.location.reload();
            }
        }, 6050);

    // Si la réponse de l'utilisateur est vide
    } else if (userAnswer === '') {
        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-error-answer">Tu n\'as rien tapé... Saisis "pierre", "feuille", ou "ciseaux" et recommence.</p>';
        }, 1200);

    // Dans tous les autres cas (réponse invalide)
    } else {
        setTimeout(function () {
            gameInfo.innerHTML = '<p id="game-error-answer">Arrête d\'écrire n\'importe quoi, c\'est "pierre", "feuille", ou "ciseaux" !</p>';
        }, 1200);
    }
}

// Écoute la touche entrée pour démarrer le jeu (en plus du onclick)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        runGame();
    }
});
