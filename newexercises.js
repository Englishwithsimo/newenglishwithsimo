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
                    
                    // Split the question text and insert the input/select
                    const [before, after] = question.text.split('___');
                    
                    sentenceDiv.appendChild(document.createTextNode(before));
                    
                    if (question.type === 'input') {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.setAttribute('data-correct', question.correct);
                        sentenceDiv.appendChild(input);
                    } else if (question.type === 'select') {
                        const select = document.createElement('select');
                        select.setAttribute('data-correct', question.correct);
                        
                        // Add default option
                        const defaultOption = document.createElement('option');
                        defaultOption.value = '';
                        defaultOption.textContent = 'Choose answer...';
                        select.appendChild(defaultOption);
                        
                        // Add answer options
                        question.options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option;
                            optionElement.textContent = option;
                            select.appendChild(optionElement);
                        });
                        
                        sentenceDiv.appendChild(select);
                    }
                    
                    sentenceDiv.appendChild(document.createTextNode(after));
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
                const inputs = this.container.querySelectorAll('input, select');
                let score = 0;
                let total = inputs.length;

                inputs.forEach(input => {
                    const correctAnswer = input.getAttribute('data-correct');
                    const userAnswer = input.value.trim();
                    const sentenceDiv = input.closest('.sentence');

                    if (userAnswer === correctAnswer) {
                        input.className = 'correct';
                        sentenceDiv.classList.add('correct');
                        sentenceDiv.classList.remove('incorrect');
                        score++;
                    } else {
                        input.className = 'incorrect';
                        sentenceDiv.classList.add('incorrect');
                        sentenceDiv.classList.remove('correct');
                    }
                });

                this.container.querySelector('.score-display').textContent = 
                    `Score: ${score} out of ${total}`;
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