// Exercise Detail Page JavaScript

// Get exercise data from URL parameter or sessionStorage
function getExerciseData() {
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseId = urlParams.get('id');
    
    // Try to get from sessionStorage first
    const storedExercise = sessionStorage.getItem('selectedExercise');
    if (storedExercise) {
        return JSON.parse(storedExercise);
    }
    
    // If not in sessionStorage, get from exercises data (you might want to import this)
    // For now, we'll use a fallback
    return null;
}

// Load exercise data and populate the page
function loadExerciseDetail() {
    const exercise = getExerciseData();
    
    if (!exercise) {
        // Redirect to exercises page if no exercise data
        window.location.href = 'exercises.html';
        return;
    }
    
    // Populate exercise information
    document.getElementById('exerciseTitle').textContent = exercise.name;
    document.getElementById('exerciseDescription').textContent = exercise.description;
    document.getElementById('exerciseDuration').textContent = exercise.duration;
    document.getElementById('exerciseDifficulty').textContent = getDifficultyText(exercise.difficulty);
    document.getElementById('exerciseEquipment').textContent = getEquipmentText(exercise.equipment);
    document.getElementById('exerciseReps').textContent = exercise.reps;
    document.getElementById('exerciseImage').src = exercise.image;
    document.getElementById('exerciseImage').alt = exercise.name;
    
    // Populate instructions
    const instructionsList = document.getElementById('exerciseInstructions');
    instructionsList.innerHTML = '';
    
    exercise.instructions.forEach((instruction) => {
        const li = document.createElement('li');
        li.textContent = instruction;
        instructionsList.appendChild(li);
    });
    
    // Populate muscles
    const musclesList = document.getElementById('exerciseMuscles');
    musclesList.innerHTML = '';
    
    exercise.muscles.forEach(muscle => {
        const muscleItem = document.createElement('span');
        muscleItem.className = 'muscle-item';
        muscleItem.textContent = muscle;
        musclesList.appendChild(muscleItem);
    });
    
    // Populate equipment
    const equipmentList = document.getElementById('exerciseEquipmentList');
    equipmentList.innerHTML = '';
    
    const equipmentItem = document.createElement('li');
    equipmentItem.innerHTML = `
        <span class="equipment-icon">🏋️</span>
        <span>${getEquipmentText(exercise.equipment)}</span>
    `;
    equipmentList.appendChild(equipmentItem);
    
    // Populate exercise details
    document.getElementById('detailReps').textContent = exercise.reps;
    document.getElementById('detailSets').textContent = exercise.sets;
    document.getElementById('detailDuration').textContent = exercise.duration;
    document.getElementById('detailDifficulty').textContent = getDifficultyText(exercise.difficulty);
    
    // Load related exercises
    loadRelatedExercises(exercise);
}

// Get difficulty text in English
function getDifficultyText(difficulty) {
    const difficultyMap = {
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
    };
    return difficultyMap[difficulty] || difficulty;
}

// Get equipment text in English
function getEquipmentText(equipment) {
    const equipmentMap = {
        'bodyweight': 'Bodyweight',
        'dumbbells': 'Dumbbells',
        'barbell': 'Barbell',
        'resistance-band': 'Resistance Band',
        'kettlebell': 'Kettlebell',
        'jump-rope': 'Jump Rope',
        'pull-up-bar': 'Pull-up Bar'
    };
    return equipmentMap[equipment] || equipment;
}

// Load related exercises (same category, different difficulty)
function loadRelatedExercises(currentExercise) {
    // This would typically come from your exercises database
    // For now, we'll create some sample related exercises
    // Get related exercises from the same category
    const relatedExercises = exercisesData.filter(ex => 
        ex.category === currentExercise.category && ex.id !== currentExercise.id
    ).slice(0, 3);
    
    const relatedContainer = document.getElementById('relatedExercises');
    relatedContainer.innerHTML = '';
    
    relatedExercises.forEach(exercise => {
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-4';
        
        const difficultyClass = `difficulty-${exercise.difficulty}`;
        const difficultyText = getDifficultyText(exercise.difficulty);
        
        col.innerHTML = `
            <div class="exercise-card" onclick="viewRelatedExercise(${exercise.id})">
                <img src="${exercise.image}" alt="${exercise.name}" class="exercise-image">
                <div class="exercise-content">
                    <h3 class="exercise-title">${exercise.name}</h3>
                    <p class="exercise-description">${exercise.description}</p>
                    <div class="exercise-meta">
                        <span class="exercise-difficulty ${difficultyClass}">${difficultyText}</span>
                        <span class="exercise-duration">${exercise.duration}</span>
                    </div>
                    <div class="exercise-muscles">
                        ${exercise.muscles.map(muscle => `<span class="muscle-tag">${muscle}</span>`).join('')}
                    </div>
                    <div class="exercise-footer">
                        <span class="exercise-equipment">${getEquipmentText(exercise.equipment)}</span>
                        <a href="#" class="view-exercise-btn" onclick="event.stopPropagation(); viewRelatedExercise(${exercise.id})">View Details</a>
                    </div>
                </div>
            </div>
        `;
        
        relatedContainer.appendChild(col);
    });
}

// View related exercise
function viewRelatedExercise(exerciseId) {
    // Navigate to the exercise detail page
    window.location.href = `exercise-detail.html?id=${exerciseId}`;
}

// Share exercise
function shareExercise() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('exerciseTitle').textContent,
            text: document.getElementById('exerciseDescription').textContent,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Exercise link copied to clipboard');
        });
    }
}

// Add to favorites
function addToFavorites() {
    const exercise = getExerciseData();
    if (!exercise) return;
    
    let favorites = JSON.parse(localStorage.getItem('favoriteExercises') || '[]');
    
    if (!favorites.find(fav => fav.id === exercise.id)) {
        favorites.push(exercise);
        localStorage.setItem('favoriteExercises', JSON.stringify(favorites));
        alert('Exercise added to favorites');
    } else {
        alert('Exercise is already in favorites');
    }
}

// Print exercise
function printExercise() {
    window.print();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadExerciseDetail();
    
    // Add event listeners for additional functionality
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.location.href = 'exercises.html';
        }
    });
    
    // Add scroll to top functionality
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 300) {
            // Show back to top button if needed
        }
    });
}

// Exercise timer functionality
class ExerciseTimer {
    constructor() {
        this.isRunning = false;
        this.timeElapsed = 0;
        this.interval = null;
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.timeElapsed++;
                this.updateDisplay();
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);
        }
    }
    
    reset() {
        this.isRunning = false;
        this.timeElapsed = 0;
        clearInterval(this.interval);
        this.updateDisplay();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update timer display if element exists
        const timerElement = document.getElementById('exerciseTimer');
        if (timerElement) {
            timerElement.textContent = display;
        }
    }
    
    getFormattedTime() {
        const minutes = Math.floor(this.timeElapsed / 60);
        const seconds = this.timeElapsed % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Global timer instance
const exerciseTimer = new ExerciseTimer();

// Timer controls
function startTimer() {
    exerciseTimer.start();
}

function pauseTimer() {
    exerciseTimer.pause();
}

function resetTimer() {
    exerciseTimer.reset();
}
