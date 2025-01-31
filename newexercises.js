// Main function to check answers
function checkAnswers(exerciseId) {
    const container = document.getElementById(exerciseId);
    const inputs = container.querySelectorAll('input, select');
    let score = 0;
    let total = inputs.length;
    
    for (let input of inputs) {
        const correctAnswer = input.getAttribute('data-correct').toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
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
    }
    
    document.getElementById(`${exerciseId}-score`).textContent = 
        `Score: ${score} out of ${total}`;
}

// Function to clear all answers and reset status
function clearAll(exerciseId) {
    const container = document.getElementById(exerciseId);
    const inputs = container.querySelectorAll('input, select');
    
    for (let input of inputs) {
        input.value = '';
        input.className = '';
        const sentenceDiv = input.closest('.sentence');
        sentenceDiv.classList.remove('correct', 'incorrect');
    }
    
    document.getElementById(`${exerciseId}-score`).textContent = '';
}

// Drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
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
});

// Drag and drop handler functions
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.target.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    e.target.textContent = data;
    e.target.classList.remove('drag-over');
    
    // When dropping, also check against the correct answer
    const correctAnswer = e.target.getAttribute('data-correct').toLowerCase();
    if (correctAnswer && data.toLowerCase() === correctAnswer) {
        e.target.classList.add('correct');
        e.target.classList.remove('incorrect');
    } else {
        e.target.classList.add('incorrect');
        e.target.classList.remove('correct');
    }
}
