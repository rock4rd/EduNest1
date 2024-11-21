<template>
    <div class="container" v-if="!categorySelected">
      <div class="header">
        <h2>Welcome to EduNest</h2>
      </div>
  
      <div class="choose">
        <h1>Choose a Subject</h1>
      </div>
  
      <div class="choices">
        <div class="choice" @click="selectCategory('science')">
          <img src="../assets/science.png" alt="Science" />
          <h2>Science</h2>
        </div>
  
        <div class="choice" @click="selectCategory('mathematics')">
          <img src="../assets/math.png" alt="Mathematics" />
          <h2>Mathematics</h2>
        </div>
  
        <div class="choice" @click="selectCategory('reading')">
          <img src="../assets/reading.png" alt="Reading" />
          <h2>Reading</h2>
        </div>
  
        <div class="choice" @click="selectCategory('geography')">
          <img src="../assets/geography.png" alt="Geography" />
          <h2>Geography</h2>
        </div>
      </div>
    </div>
  
    <div class="quiz-container" v-else>
      <h1>{{ questionText }}</h1>
      <div v-if="optionsVisible">
        <button v-for="(option, index) in currentOptions" :key="index" @click="checkAnswer(option)">
          {{ option }}
        </button>
      </div>
      <p v-if="timerVisible">Time left: {{ timeLeft }}s</p>
      <p v-if="scoreVisible">Score: {{ score }}</p>
      <button v-if="submitVisible" @click="submitAnswers">Submit Answers</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "EduNestQuiz",
    data() {
      return {
        categorySelected: false,
        selectedCategory: "",
        questions: [], // Will hold questions based on selected category
        currentQuestionIndex: 0,
        currentOptions: [],
        questionText: "Choose a category",
        userAnswers: [],
        score: 0,
        timeLeft: 10,
        timer: null,
      };
    },
    computed: {
      optionsVisible() {
        return this.questions.length > 0 && this.currentQuestionIndex < this.questions.length;
      },
      timerVisible() {
        return this.questions.length > 0;
      },
      scoreVisible() {
        return this.questions.length > 0;
      },
      submitVisible() {
        return this.questions.length > 0;
      },
    },
    methods: {
      // Example questions data structure
      getQuestions(category) {
        const allQuestions = {
          science: [
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "N2"], answer: "H2O" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Saturn"], answer: "Mars" },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], answer: "Mitochondria" },
    { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { question: "Which element has the atomic number 1?", options: ["Hydrogen", "Oxygen", "Helium", "Carbon"], answer: "Hydrogen" },
    { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: "Au" },
    { question: "How many bones are in the adult human body?", options: ["206", "204", "210", "200"], answer: "206" },
    { question: "What gas do plants absorb from the air for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Saturn", "Neptune"], answer: "Jupiter" },
    { question: "What type of rock is formed by cooling and solidification of magma?", options: ["Sedimentary", "Metamorphic", "Igneous", "Fossil"], answer: "Igneous" },
  ],
  
  mathematics: [
    { question: "What is 5 + 3?", options: ["7", "8", "9", "10"], answer: "8" },
    { question: "What is 12 * 4?", options: ["48", "44", "50", "42"], answer: "48" },
    { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], answer: "4" },
    { question: "What is 7 * 9?", options: ["56", "63", "72", "49"], answer: "63" },
    { question: "What is 100 / 5?", options: ["20", "25", "30", "50"], answer: "20" },
    { question: "What is 15 - 7?", options: ["7", "8", "6", "5"], answer: "8" },
    { question: "What is the perimeter of a rectangle with length 5 and width 3?", options: ["8", "15", "16", "18"], answer: "16" },
    { question: "What is 2^3?", options: ["4", "6", "8", "16"], answer: "8" },
    { question: "What is 25 + 25?", options: ["40", "50", "60", "75"], answer: "50" },
    { question: "What is the value of pi (π) to two decimal places?", options: ["3.12", "3.14", "3.15", "3.16"], answer: "3.14" },
  ],

  reading: [
    { question: "Who wrote '1984'?", options: ["George Orwell", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"], answer: "George Orwell" },
    { question: "Which is the longest river?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Amazon" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Jane Austen", "Mark Twain", "Charles Dickens"], answer: "Harper Lee" },
    { question: "In which city does the story of 'The Great Gatsby' take place?", options: ["Los Angeles", "New York", "Chicago", "London"], answer: "New York" },
    { question: "Which novel begins with the line, 'Call me Ishmael'?", options: ["Moby Dick", "The Great Gatsby", "The Odyssey", "The Catcher in the Rye"], answer: "Moby Dick" },
    { question: "Who wrote 'Pride and Prejudice'?", options: ["Emily Dickinson", "Charlotte Brontë", "Jane Austen", "Virginia Woolf"], answer: "Jane Austen" },
    { question: "What is the title of the first book in the Harry Potter series?", options: ["The Chamber of Secrets", "The Philosopher's Stone", "The Prisoner of Azkaban", "The Goblet of Fire"], answer: "The Philosopher's Stone" },
    { question: "Who wrote 'The Hobbit'?", options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "C.S. Lewis"], answer: "J.R.R. Tolkien" },
    { question: "Who wrote 'The Catcher in the Rye'?", options: ["J.D. Salinger", "F. Scott Fitzgerald", "Hemingway", "Tennessee Williams"], answer: "J.D. Salinger" },
    { question: "In which novel would you find the character 'Willy Wonka'?", options: ["Charlie and the Chocolate Factory", "Matilda", "The BFG", "The Witches"], answer: "Charlie and the Chocolate Factory" },
  ],

  geography: [
    { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
    { question: "Which is the largest continent?", options: ["Africa", "Asia", "Europe", "America"], answer: "Asia" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["South Korea", "China", "Japan", "India"], answer: "Japan" },
    { question: "Which is the smallest country in the world?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: "Vatican City" },
    { question: "Which is the longest mountain range in the world?", options: ["Himalayas", "Rockies", "Andes", "Alps"], answer: "Andes" },
    { question: "Which country has the most time zones?", options: ["Russia", "United States", "China", "Canada"], answer: "Russia" },
    { question: "Which ocean is the largest?", options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"], answer: "Pacific Ocean" },
    { question: "Which river is the longest in the world?", options: ["Nile", "Amazon", "Yangtze", "Ganges"], answer: "Amazon" },
    { question: "Which country is known for its famous pyramids?", options: ["Greece", "Egypt", "Mexico", "India"], answer: "Egypt" },
    { question: "Which mountain is the highest in the world?", options: ["Mount Everest", "K2", "Mount Kilimanjaro", "Mount McKinley"], answer: "Mount Everest" },
  ],
        };
  
        return allQuestions[category] || [];
      },
  
      selectCategory(category) {
        this.selectedCategory = category;
        this.questions = this.getQuestions(category);
        this.categorySelected = true;
        this.loadQuestion();
      },
  
      loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
          this.questionText = "Quiz Over!";
          this.currentOptions = [];
          clearInterval(this.timer);
          return;
        }
  
        const question = this.questions[this.currentQuestionIndex];
        this.questionText = question.question;
        this.currentOptions = question.options;
  
        this.timeLeft = 10;
        clearInterval(this.timer);
        this.timer = setInterval(this.updateTimer, 1000);
      },
  
      checkAnswer(selectedOption) {
        const question = this.questions[this.currentQuestionIndex];
        clearInterval(this.timer);
  
        this.userAnswers.push(selectedOption);
  
        if (selectedOption === question.answer) {
          this.score += this.timeLeft;
        }
  
        this.currentQuestionIndex++;
        this.loadQuestion();
      },
  
      updateTimer() {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
          clearInterval(this.timer);
          this.currentQuestionIndex++;
          this.loadQuestion();
        }
      },
  
      submitAnswers() {
        alert(`Quiz Completed! Your final score is ${this.score}`);
        this.resetQuiz();
      },
  
      resetQuiz() {
        this.categorySelected = false;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.timeLeft = 10;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles for category selection */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/mainpage.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .header h2 {
    font-size: 2.5em;
    margin-top: 20px;
    color: white;
  }
  
  .choose h1 {
    font-size: 3em;
    margin-bottom: 40px;
    color: white;
  }
  
  .choices {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }
  
  .choice {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    text-align: center;
    background-color: #ffb835;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .choice:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .choice img {
    width: 100%;
    height: auto;
    max-width: 150px;
  }
  
  .choice h2 {
    margin-top: 15px;
    font-size: 1.5em;
    color: white;
  }
  
  /* Styles for the quiz */
  .quiz-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/mainpage.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 20px;
}
.quiz-container h1 {
  font-size: 2em;
  color: white; /* Deep purple */
  margin-bottom: 20px;
 
}
.quiz-container button {
  margin: 10px;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  background-color: #ff8a65; /* Light orange */
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

  
.quiz-container button:hover {
  background-color: #ff7043; /* Slightly darker orange */
  transform: scale(1.1);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}
.quiz-container button:active {
  background-color: #ff5722; /* Even darker orange */
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Timer and Score */
.quiz-container p {
  font-size: 1.5em;
  color: white; /* Deep purple */
  margin-bottom: 20px;
}

/* Submit Button */
.quiz-container button.submit {
  background-color: #4caf50; /* Green for success */
  font-weight: bold;
}

.quiz-container button.submit:hover {
  background-color: #388e3c; /* Darker green */
}

/* Animations for smooth appearance */
.quiz-container h1,
.quiz-container button {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
  </style>
  