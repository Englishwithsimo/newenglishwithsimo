class Exercise {
    constructor(number, title, questions) {
        this.number = number;
        this.title = title;
        this.questions = questions;
        this.container = null;
    }

    createExercise() {
        const template = document.querySelector('#exercise-template');
        const exerciseElement = template.content.cloneNode(true);
        
        // Set exercise title and number
        exerciseElement.querySelector('h2').textContent = 
            `Exercise ${this.number}: ${this.title}`;

        const contentDiv = exerciseElement.querySelector('.exercise-content');
        
        // Add questions
        this.questions.forEach(question => {
            const sentenceDiv = document.createElement('div');
            sentenceDiv.className = 'sentence';
            
            // Handle multiple blanks by splitting on ___ and processing each part
            const parts = question.text.split('___');
            
            parts.forEach((part, index) => {
                // Add the text part
                sentenceDiv.appendChild(document.createTextNode(part));
                
                // If this isn't the last part, add an input/select
                if (index < parts.length - 1) {
                    if (question.type === 'input') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        // Handle both single string and array of correct answers
                        const correctAnswer = Array.isArray(question.correct) 
                            ? question.correct[index] 
                            : question.correct;
                        input.setAttribute('data-correct', correctAnswer);
                        sentenceDiv.appendChild(input);
                    } else if (question.type === 'select') {
                        const select = document.createElement('select');
                        // Handle both single string and array of correct answers
                        const correctAnswer = Array.isArray(question.correct) 
                            ? question.correct[index] 
                            : question.correct;
                        select.setAttribute('data-correct', correctAnswer);
                        
                        // Add default option
                        const defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = 'Choose answer...';
                        select.appendChild(defaultOption);
                        
                        // Handle both single array and array of arrays for options
                        const options = Array.isArray(question.options[0]) 
                            ? question.options[index] 
                            : question.options;
                        
                        options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option;
                            optionElement.textContent = option;
                            select.appendChild(optionElement);
                        });
                        
                        sentenceDiv.appendChild(select);
                    }
                }
            });
            
            contentDiv.appendChild(sentenceDiv);
        });

        // Add event listeners
        const scoreBtn = exerciseElement.querySelector('.score-btn');
        const clearBtn = exerciseElement.querySelector('.clear-btn');
        
        scoreBtn.addEventListener('click', () => this.checkAnswers());
        clearBtn.addEventListener('click', () => this.clearAll());

        // Add to page
        document.getElementById('exercises-container').appendChild(exerciseElement);
        this.container = document.getElementById('exercises-container').lastElementChild;
    }

    checkAnswers() {
        const sentences = this.container.querySelectorAll('.sentence');
        let totalScore = 0;
        let totalQuestions = 0;

        sentences.forEach(sentenceDiv => {
            const inputs = sentenceDiv.querySelectorAll('input, select');
            let sentenceCorrect = true;
            
            inputs.forEach(input => {
                const correctAnswer = input.getAttribute('data-correct').toLowerCase();
                const userAnswer = input.value.trim().toLowerCase();
                totalQuestions++;

                if (userAnswer === correctAnswer) {
                    input.className = 'correct';
                    totalScore++;
                } else {
                    input.className = 'incorrect';
                    sentenceCorrect = false;
                }
            });

            if (sentenceCorrect && inputs.length > 0) {
                sentenceDiv.classList.add('correct');
                sentenceDiv.classList.remove('incorrect');
            } else if (inputs.length > 0) {
                sentenceDiv.classList.add('incorrect');
                sentenceDiv.classList.remove('correct');
            }
        });

        this.container.querySelector('.score-display').textContent = 
            `Score: ${totalScore} out of ${totalQuestions}`;
    }

    clearAll() {
        const inputs = this.container.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
            input.className = '';
            const sentenceDiv = input.closest('.sentence');
            sentenceDiv.classList.remove('correct', 'incorrect');
        });
        this.container.querySelector('.score-display').textContent = '';
    }
}