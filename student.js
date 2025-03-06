// Firebase setup
const firebaseConfig = {
    apiKey: "AIzaSyCutyrVdAXgzDoGglHGD-j55AVzFjHR5eo",
        authDomain: "allcleartech-11c44.firebaseapp.com",
        projectId: "allcleartech-11c44",
        storageBucket: "allcleartech-11c44.firebasestorage.app",
        messagingSenderId: "746758569433",
        appId: "1:746758569433:web:64a5db5c3123a758422dc8"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Fetch Student Data
const fetchStudentData = async () => {
    const studentRef = db.collection('students').doc('studentId'); // Replace 'studentId' with actual student ID
    const doc = await studentRef.get();
    if (doc.exists) {
        const data = doc.data();
        document.getElementById('student-name').innerText = data.name;
        document.getElementById('student-roll-no').innerText = data.rollNo;
        document.getElementById('marks').innerText = `Marks: ${data.marks}`;
        document.getElementById('attendance').innerText = `Attendance: ${data.attendance}`;
    }
};

// Motivational Quote
const fetchQuote = async () => {
    // You can use an API for daily quotes or store them in an array
    const quotes = [
        "Your potential is endless.",
        "Believe in yourself.",
        "Success is not final, failure is not fatal."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').innerText = randomQuote;
};

// Quiz Section (Example with 5 questions)
const questions = [
    { question: "What is 2 + 2?", options: ["2", "3", "4", "5"], correct: "4" },
    { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Kolkata", "Chennai"], correct: "Delhi" },
    // Add more questions here
];

const renderQuiz = () => {
    let quizHTML = '';
    questions.forEach((q, index) => {
        quizHTML += `
            <div class="mb-4">
                <p class="font-semibold">${q.question}</p>
                ${q.options.map((option, i) => `
                    <label class="block">
                        <input type="radio" name="question-${index}" value="${option}" class="mr-2"> ${option}
                    </label>
                `).join('')}
            </div>
        `;
    });
    document.getElementById('quiz-section').innerHTML = quizHTML;
};

// Quiz Submission Logic
const submitQuiz = () => {
    let score = 0;
    const wrongAnswers = [];
    questions.forEach((q, index) => {
        const userAnswer = document.querySelector(`input[name="question-${index}"]:checked`)?.value;
        if (userAnswer === q.correct) {
            score++;
        } else {
            wrongAnswers.push(q.question);
        }
    });
    alert(`Your score: ${score}/${questions.length}`);
    showWeakSections(wrongAnswers);
};

// Weak Sections Logic
const showWeakSections = (wrongAnswers) => {
    const weakSectionElement = document.getElementById('weak-sections');
    const weakList = document.getElementById('weak-sections-list');
    weakList.innerHTML = wrongAnswers.map(answer => `<li>${answer}</li>`).join('');
    weakSectionElement.classList.remove('hidden');
};

// Event Listeners
document.getElementById('submit-quiz').addEventListener('click', submitQuiz);

// Initialize the Dashboard
fetchStudentData();
fetchQuote();
renderQuiz();
