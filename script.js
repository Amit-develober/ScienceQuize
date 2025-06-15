const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultArea = document.getElementById('result-area');
const scoreArea = document.getElementById('score-area');
const selectionContainer = document.querySelector('.selection-container');
const quizContainer = document.querySelector('.quiz-container');
const class6to10Button = document.getElementById('class6-10');
const class11to12Button = document.getElementById('class11-12');

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let selectedQuestions = []; // Variable to hold the selected question set

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Function to update the score display
function updateScoreDisplay() {
    scoreArea.innerText = `Score: ${score}`;
}

function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Use shuffled questions
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.innerText = option;
        button.addEventListener('click', () => selectAnswer(option, currentQuestion.answer));
        optionsElement.appendChild(button);
    });
    nextButton.style.display = 'none'; // Hide next button initially
    resultArea.innerText = ''; // Clear previous result message
    updateScoreDisplay(); // Update score display when loading a new question
}

function selectAnswer(selectedOption, correctAnswer) {
    // Disable all option buttons after selection
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === correctAnswer) {
        score++; // Increase score for correct answer
        // Highlight correct answer
        Array.from(optionsElement.children).forEach(button => {
            if (button.innerText === selectedOption) {
                button.classList.add('correct');
            }
        });
        resultArea.innerText = 'Correct!';
        resultArea.style.color = 'green';
    } else {
        score--; // Decrease score for wrong answer
        // Highlight wrong answer and show correct answer
        Array.from(optionsElement.children).forEach(button => {
            if (button.innerText === selectedOption) {
                button.classList.add('wrong');
            } else if (button.innerText === correctAnswer) {
                 button.classList.add('correct');
            }
        });
         resultArea.innerText = `Wrong! The correct answer was ${correctAnswer}`;
         resultArea.style.color = 'red';
    }

    updateScoreDisplay(); // Update score display after answer selection
    nextButton.style.display = 'block'; // Show next button
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) { // Check against shuffled questions length
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionElement.innerText = 'Quiz Finished!';
    optionsElement.innerHTML = '';
    nextButton.style.display = 'none';
    resultArea.innerText = `Your final score is ${score} out of ${shuffledQuestions.length}.`; // Use shuffled questions length
    resultArea.style.color = '#333';
    scoreArea.style.display = 'none'; // Hide score at the end
}

// Event listener for the next button
nextButton.addEventListener('click', nextQuestion);

// Event listeners for class selection buttons
class6to10Button.addEventListener('click', () => startQuiz(questions6to10));
class11to12Button.addEventListener('click', () => startQuiz(questions11to12));

function startQuiz(questions) {
    selectedQuestions = questions; // Set the selected questions
    shuffledQuestions = shuffleArray([...selectedQuestions]); // Shuffle the selected questions
    currentQuestionIndex = 0;
    score = 0;
    selectionContainer.style.display = 'none'; // Hide selection area
    quizContainer.style.display = 'block'; // Show quiz area
    loadQuestion(); // Load the first question
}

// Initial state: show selection, hide quiz
selectionContainer.style.display = 'block';
quizContainer.style.display = 'none';
