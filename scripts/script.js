//Exo 3
const readline = require('readline');

// Crée une interface pour lire les données LIGNE par ligne
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const main = async () => {
    console.info('Bienvenue dans le programme interactif !');
    let exit = false;
    while (!exit) {
      const name = await askQuestion("Comment tu t'appelles ?\n");
      console.log(`Bonjour ${name} !`);

      const number1 = parseInt(await askQuestion('Entre un nombre: '));
      const number2 = parseInt(await askQuestion('Entre un autre nombre: '));

      const options = ['Addition', 'Soustraction', 'Multiplication'];
      const selectedOption = await askQuestion(`Choisis une opération: ${options.join(', ')}\n`);

      let res;
      let result;

      if (selectedOption == options[0]) {
        res = number1 + number2;
        result = await askQuestion(`Quel est le résultat de ${number1} + ${number2} ?\n`);
      } else if (selectedOption == options[1]) {
        res = number1 - number2;
        result = await askQuestion(`Quel est le résultat de ${number1} - ${number2} ?\n`);
      } else if (selectedOption == options[2]) {
        res = number1 * number2;
        result = parseInt(await askQuestion(`Quel est le résultat de ${number1} * ${number2} ?\n`));
      } else {
        console.log(`Pourquoi tu m'écris ${selectedOption} ? Tu sais lire ?`);
        console.log(`Il y a que ${options.join(', ')} de disponibles`);
      }

      if (res != undefined) {
        if (res == result) {
        console.log("C'est bien tu sais compter");
        } else {
          console.log("Apprends à compter");
        }
      }
      
      exit = true;
    }

    console.error("Ah t'y vas déjà... bon bah vas-y a+");
    rl.close(); // Termine l'interface readline
}

main()