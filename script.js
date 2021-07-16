// https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple


let index = 0
let score = 0

let questions = []
const question = document.getElementById('question')
const answers = document.querySelectorAll('[answer]')
const nextBtn = document.getElementById('nextBtn')

answers.forEach((ans)=>{
    ans.addEventListener('click', (e)=>{
        let selectedAns = ans.innerHTML
        if(questions[index].correct_answer === selectedAns){
            rightChoice(ans.id)
        } else{
            wrongChoice(ans.id)
            console.log('wrong');
        }
    })
})

loadData()


function rightChoice(id) {
    let ans = document.getElementById(id)
    ans.classList.add('right-choice')
    nextBtn.classList.remove('invisible')
    score = score + 1
}

function wrongChoice(id) {
    let ans = document.getElementById(id)
    ans.classList.add('wrong-choice')
    nextBtn.classList.remove('invisible')
}

const endWindow = document.getElementById('endWindow')

nextBtn.addEventListener('click', (e)=>{
    console.log(index);

    if (index == 9) {
        // end
        endWindow.innerHTML = "You got " + score + " answers Right"
        endWindow.classList.remove('invisible')

    } else{
        index = index+1
        nextBtn.classList.add('invisible')
        clearStyle()
        loadQuestion()
    }


})

function clearStyle() {
    answers.forEach(ans=>{
        ans.classList.remove('right-choice')
        ans.classList.remove('wrong-choice')
    })
}

function loadData() {
    const url = 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple'


    fetch(url).then((response)=>{
        response.json().then((data)=>{
            console.log(data.results);

            questions = data.results

            loadQuestion()

        })
    })
}

function loadQuestion() {
    question.innerHTML = questions[index].question
    let _answers = questions[index].incorrect_answers
    _answers.push(questions[index].correct_answer)
    console.log(_answers)
    shuffleArray(_answers)
    console.log(_answers);
    for(var i = 0; i < 4; i++){
        let num = i+1
        let item = num.toString()
        document.getElementById(item).innerHTML = _answers[i]
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}