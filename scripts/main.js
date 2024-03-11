// Créez une application qui permet à un étudiant d'entrer une liste de mots et leur traduction.

// Ensuite, quand il le veut, l'étudiant peut "lancer" le "jeu" qui va lui demander au hasard un mot issu de la liste des mots qu'il a rentrés.

// - Dès qu'il y a au moins un mot dans la liste, le bouton pour "lancer le jeu" apparaît, s'il n'y en a pas, il disparait/n'apparaît pas
// - Affichez quelque part le nombre de mots inscrits dans la liste
// - À tout moment, l'étudiant peut "quitter" le "jeu" pour aller ajouter des mots à sa liste.
// - La liste est stockée dans un tableau d'objets qui contient : le mot original et le mot traduit
// - L'étudiant peut aussi remettre la liste à 0 sur l'écran où il peut insérer des mots
// - Si la case du mot et de la traduction ne sont pas remplis => on n'envoie pas le mot dans la liste
// - La casse (majuscule ou minuscule) ne doit pas avoir d'importance dans la partie jeu (càd que peu importe si l'étudiant met une majuscule ou pas aux lettres ça n'aura pas d'impact sur le fait qu'il ait "bon" ou pas)
// - Quand l'étudiant lance le jeu, un panneau de jeu spécial apparaît et lui propose directement un mot à traduire (qui est un random à chaque fois)
// - On affiche un message de félicitations s'il a réussi à bien traduire le mot sinon un message d'erreur


// Des bonus chouettes pourraient être de : 
// ----------------------------------------
// 🍒 Permettre de stocker plusieurs listes (une par langue du student par ex : néerlandais, anglais et latin) et lui permettre de tester la langue qu'il souhaite entraîner

// 🍒 Plutôt que de faire un random pur à chaque fois et être confronté au même mot potentiellement, faire un random intelligent qui "enlève" le mot (s'il a été bien traduit par l'étudiant)

// 🍒 On peut compter les points et les afficher quelque part sur cette interface


// *********** Variables ************

let wrapper = document.querySelector('.wrapper')
let inputToTranslate = document.querySelector('.inputToTranslate')
let InputTranslated = document.querySelector('.InputTranslated')
let inputTest = document.querySelector('.input-test')
let countDown = document.querySelector('.countDown')
let buttonSend = document.querySelector('.send')
let buttonErase = document.querySelector('.erase')
let buttonTest = document.querySelector('.test')
let buttonAnswer = document.querySelector('.button-answer')
let appBox =document.querySelector('.app-box')
let testBox = document.querySelector('.test-box')
let cancel = document.querySelector('.cancel')
let testToTranslate = document.querySelector('.test-to-translate')
let correctAnswer = document.querySelector('.correct')
let falseAnswer = document.querySelector('.false')
let i = 0
let randomNumber
let nbrTry = 0
let nbrSuccess = 0
let count = document.querySelector('.count')
let wordTable = [];
correctIndices = []
let motMagique
// *********** Fonctions ************

// function getRandomNumber() {
//    randomNumber = Math.random()
//   }

// Va chercher un mot random 
function giveRandomNumber() {
    return Math.ceil(Math.random()*i);
  }
  
  // Aller chercher un nouveau Mot au hasard dans le tableau
  function newWord(indexMot) {
    // const bonneReponse = tableauDeMots[indexMot]["Mot traduit"].toLowerCase()
    const bonneReponse = localStorage.getItem(`translate${indexMot}`).toLowerCase()
    console.log("Le mot magique est : " + bonneReponse)
    motMagique = bonneReponse
    return bonneReponse
  }
  
  // On génère un mot avec un nombre aléatoire
  function newWordWithRandom() {
    const numeroMagique = giveRandomNumber()
    newWord(numeroMagique)
    testToTranslate.innerHTML = `${localStorage.getItem(`wordToTranslate${numeroMagique}`)}`
  }


function sendTranslate() {
    buttonSend.addEventListener('click', function() {
   
    i++
    localStorage.setItem(`index`, `${i}`)
    localStorage.setItem(`wordToTranslate${i}`, `${inputToTranslate.value}`)
    localStorage.setItem(`translate${i}`, `${InputTranslated.value}`)

        if (localStorage.getItem("wordToTranslate1")!= null && localStorage.getItem("translate1")!= null) {
            buttonTest.classList.add('active')
        } 

    inputToTranslate.value =""
    InputTranslated.value=""
    countDown.innerHTML =""
    countDown.innerHTML = `${parseInt(i)}`

}) 
}

function eraseList() {
    buttonErase.addEventListener('click', function(){
    localStorage.clear()
    location.reload()
})
}
function displayTest() {
buttonTest.addEventListener('click', function(){
    testBox.classList.add('appear')
    cancel.classList.add('appear')  
    testToTranslate.innerHTML = ""
    // testToTranslate.innerHTML += `${localStorage.getItem(`wordToTranslate${Math.ceil(randomNumber*i)}`)}`
    newWordWithRandom()
    
})
}
function cancelTest() {
    cancel.addEventListener('click', function(){
        testBox.classList.remove('appear')
        cancel.classList.remove('appear')
    })
    }



function test() {
    buttonAnswer.addEventListener('click', function() {
        // let random = Math.ceil(Math.random())
        nbrTry++
        
        // getRandomNumber()
        // console.log(randomNumber)
        // console.log(Math.round(randomNumber*i)+1)
        if (motMagique== inputTest.value ) {
            nbrSuccess++
            correctAnswer.classList.add('show')
            falseAnswer.classList.remove('show')
            testToTranslate.innerHTML = ""

            // newWordWithRandom()

            // testToTranslate.innerHTML += `${localStorage.getItem(`wordToTranslate${Math.ceil(Math.random()*i)}`)}`
            
        } else {
            falseAnswer.classList.add('show')
            correctAnswer.classList.remove('show')
        }
        inputTest.value =""
        console.log(`${nbrSuccess}/${nbrTry}`);
        count.classList.add('show')
        count.innerHTML = `${nbrSuccess}/${nbrTry}`

        setTimeout(() => {
            falseAnswer.classList.remove('show')
            correctAnswer.classList.remove('show')
            result.setAttribute("class", "result")
            }, 5000)
        newWordWithRandom()
    })
}

// function test(randomNumber) {
    
//     buttonAnswer.addEventListener('click', function() {
//         if (localStorage.getItem(`translate${Math.ceil(randomNumber*i)}`) == inputTest.value ) {
//             correctAnswer.classList.add('show');
//             falseAnswer.classList.remove('show');

//             // Add the index of the correctly translated word to the array
//             correctIndices.push(Math.ceil(randomNumber*i));

//             // Remove the index from the array of words to translate
//             let indexToRemove = correctIndices.indexOf(Math.ceil(randomNumber*i));
//             if (indexToRemove !== -1) {
//                 correctIndices.splice(indexToRemove, 1);
//             }

//             // Check if there are any more words left to translate
//             if (correctIndices.length > 0) {
//                 // Randomly select an index from the array of correct indices
//                 let newIndex = correctIndices[Math.floor(Math.random() * correctIndices.length)];
//                 // Display the new word to translate
//                 testToTranslate.innerHTML = localStorage.getItem(`wordToTranslate${newIndex}`);
//             } 
//         } else {
//             falseAnswer.classList.add('show');
//             correctAnswer.classList.remove('show');
//         }
//     })
// }


// *********** Appels de fonctions ************

console.log(i)
sendTranslate()
eraseList()
// getRandomNumber()
displayTest()
cancelTest()
test()




// *********** Brouillon ************




// localStorage.clear()




