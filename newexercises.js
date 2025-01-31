// Main function to check answers
function checkAnswers(exerciseId) {
    try {
        const container = document.getElementById(exerciseId);
        if (!container) throw new Error('Exercise container not found');
        
        const inputs = container.querySelectorAll('input, select');
        let score = 0;
        let total = inputs.length;
        
        for (let input of inputs) {
            const correctAnswer = input.getAttribute('data-correct');
            if (!correctAnswer) continue; // Skip if no correct answer is set
            
            const userAnswer = (input.value || '').trim();
            const sentenceDiv = input.closest('.sentence');
            
            // Case insensitive comparison
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                input.className = 'correct';
                if (sentenceDiv) {
                    sentenceDiv.classList.add('correct');
                    sentenceDiv.classList.remove('incorrect');
                }
                score++;
            } else {
                input.className = 'incorrect';
                if (sentenceDiv) {
                    sentenceDiv.classList.add('incorrect');
                    sentenceDiv.classList.remove('correct');
                }
            }
        }
        
        const scoreElement = document.getElementById(`${exerciseId}-score`);
        if (scoreElement) {
            scoreElement.textContent = `Score: ${score} out of ${total}`;
        }
    } catch (error) {
        console.error('Error checking answers:', error);
    }
}

// Function to clear all answers and reset status
function clearAll(exerciseId) {
    try {
        const container = document.getElementById(exerciseId);
        if (!container) throw new Error('Exercise container not found');
        
        const inputs = container.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.value = '';
            input.className = '';
            const sentenceDiv = input.closest('.sentence');
            if (sentenceDiv) {
                sentenceDiv.classList.remove('correct', 'incorrect');
            }
        });
        
        const scoreElement = document.getElementById(`${exerciseId}-score`);
        if (scoreElement) {
            scoreElement.textContent = '';
        }
    } catch (error) {
        console.error('Error clearing answers:', error);
    }
}

// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
    try {
        const draggableWords = document.querySelectorAll('.draggable-word');
        const dropZones = document.querySelectorAll('.drop-zone');
        
        draggableWords.forEach(word => {
            word.addEventListener('dragstart', handleDragStart);
            word.addEventListener('dragend', handleDragEnd);
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', handleDragOver);
            zone.addEventListener('drop', handleDrop);
            zone.addEventListener('dragenter', handleDragEnter);
            zone.addEventListener('dragleave', handleDragLeave);
        });
    } catch (error) {
        console.error('Error initializing drag and drop:', error);
    }
});

// Drag and drop handler functions
function handleDragStart(e) {
    try {
        e.dataTransfer.setData('text/plain', e.target.textContent.trim());
        e.target.classList.add('dragging');
    } catch (error) {
        console.error('Error starting drag:', error);
    }
}

function handleDragEnd(e) {
    try {
        e.target.classList.remove('dragging');
    } catch (error) {
        console.error('Error ending drag:', error);
    }
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    try {
        e.preventDefault();
        e.target.classList.add('drag-over');
    } catch (error) {
        console.error('Error entering drag zone:', error);
    }
}

function handleDragLeave(e) {
    try {
        e.target.classList.remove('drag-over');
    } catch (error) {
        console.error('Error leaving drag zone:', error);
    }
}

function handleDrop(e) {
    try {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        e.target.textContent = data;
        e.target.classList.remove('drag-over');
        
        // Case insensitive comparison for correct answer
        const correctAnswer = e.target.getAttribute('data-correct');
        if (correctAnswer) {
            if (data.toLowerCase() === correctAnswer.toLowerCase()) {
                e.target.classList.add('correct');
                e.target.classList.remove('incorrect');
            } else {
                e.target.classList.add('incorrect');
                e.target.classList.remove('correct');
            }
        }
    } catch (error) {
        console.error('Error handling drop:', error);
    }
}
