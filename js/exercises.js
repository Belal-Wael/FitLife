// Exercise Database
const exercisesData = [
    // Cardio Exercises
    {
        id: 1,
        name: "Running in Place",
        category: "cardio",
        difficulty: "beginner",
        duration: "10-15 minutes",
        equipment: "bodyweight",
        muscles: ["Legs", "Heart", "Lungs"],
        description: "Excellent exercise for improving cardiovascular fitness and burning calories",
        image: "./assets/images/young-man-practicing-interval-workout-stairs.jpg",
        instructions: [
            "Stand straight with feet shoulder-width apart",
            "Start running in place by lifting your knees high",
            "Move your arms naturally as in regular running",
            "Maintain a steady and comfortable rhythm",
            "Breathe deeply and regularly"
        ],
        reps: "10-15 minutes continuous",
        sets: "1-2 sets",
        videoUrl: "#"
    },
    {
        id: 2,
        name: "Jump Rope",
        category: "cardio",
        difficulty: "intermediate",
        duration: "5-10 minutes",
        equipment: "jump-rope",
        muscles: ["Legs", "Shoulders", "Heart"],
        description: "High-intensity exercise to improve coordination and cardiovascular fitness",
        image: "./assets/images/young-female-exercising-with-jumping-rope.jpg",
        instructions: [
            "Hold the rope by the handles with hands shoulder-width apart",
            "Stand straight with feet close together",
            "Start jumping by lifting the rope over your head",
            "Land on the balls of your feet while keeping knees flexible",
            "Maintain a steady and comfortable rhythm"
        ],
        reps: "30-60 seconds",
        sets: "3-5 sets",
        videoUrl: "#"
    },
    {
        id: 3,
        name: "Burpees",
        category: "cardio",
        difficulty: "advanced",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Full Body", "Heart", "Lungs"],
        description: "Comprehensive high-intensity exercise combining strength and cardio",
        image: "./assets/images/full-shot-fit-people-doing-exercises-together.jpg",
        instructions: [
            "Start in a standing position",
            "Lower into a squat position and place hands on the ground",
            "Jump feet back into a plank position",
            "Perform one push-up",
            "Jump feet forward to squat position",
            "Jump up high with arms raised overhead"
        ],
        reps: "8-15 reps",
        sets: "3-5 sets",
        videoUrl: "#"
    },

    // Strength Exercises
    {
        id: 4,
        name: "Push-ups",
        category: "strength",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Chest", "Shoulders", "Arms"],
        description: "Basic exercise to strengthen upper body muscles",
        image: "./assets/images/portrait-fit-male-training-outdoors.jpg",
        instructions: [
            "Start in plank position with hands shoulder-width apart",
            "Keep body in a straight line from head to feet",
            "Lower slowly until chest nearly touches the ground",
            "Push body up to starting position",
            "Maintain regular breathing"
        ],
        reps: "8-15 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 5,
        name: "Squats",
        category: "strength",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Legs", "Glutes", "Core"],
        description: "Basic exercise to strengthen lower body muscles",
        image: "./assets/images/full-shot-man-doing-squats-with-dumbbell.jpg",
        instructions: [
            "Stand with feet shoulder-width apart",
            "Extend arms forward for balance",
            "Lower slowly as if sitting in a chair",
            "Ensure knees don't go beyond toes",
            "Raise body up to starting position"
        ],
        reps: "12-20 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 6,
        name: "Deadlift",
        category: "strength",
        difficulty: "advanced",
        duration: "10-15 minutes",
        equipment: "barbell",
        muscles: ["Back", "Legs", "Glutes", "Core"],
        description: "Advanced compound exercise to strengthen back and leg muscles",
        image: "./assets/images/muscular-build-man-making-effort-while-weightlifting-cross-training-gym.jpg",
        instructions: [
            "Stand with feet hip-width apart",
            "Grip the bar with double overhand grip, hands outside legs",
            "Lower the bar slowly along the legs",
            "Keep back straight and chest up",
            "Lift the bar using leg and back muscles"
        ],
        reps: "5-8 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },

    // Flexibility Exercises
    {
        id: 7,
        name: "Back Stretches",
        category: "flexibility",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Back", "Shoulders", "Spine"],
        description: "Stretching exercises to improve back flexibility and reduce tension",
        image: "./assets/images/close-up-young-beautiful-woman-jogging.jpg",
        instructions: [
            "Sit on the floor with legs extended forward",
            "Extend arms upward and clasp hands together",
            "Bend forward slowly trying to touch your toes",
            "Hold the position for 30 seconds",
            "Breathe deeply and relax"
        ],
        reps: "30 seconds",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 8,
        name: "Leg Stretches",
        category: "flexibility",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Legs", "Hamstrings", "Hips"],
        description: "Stretching exercises to improve leg muscle flexibility",
        image: "./assets/images/indoors-mature-woman-stretching-her-legs.jpg",
        instructions: [
            "Sit on the floor with right leg extended forward",
            "Bend left leg and place left foot on right thigh",
            "Bend forward slowly toward the extended leg",
            "Hold the position for 30 seconds",
            "Repeat with the other leg"
        ],
        reps: "30 seconds per leg",
        sets: "2-3 sets",
        videoUrl: "#"
    },

    // Core Exercises
    {
        id: 9,
        name: "Plank",
        category: "core",
        difficulty: "intermediate",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Abs", "Core", "Shoulders"],
        description: "Excellent exercise to strengthen abdominal and core muscles",
        image: "./assets/images/people-sports-fitness-strength-endurance-concept-stylish-brunette-athletic-girl-sportswear-exercising-spacious-hall-by-window-doing-elbow-plank-green-yoga-mat-wooden-floor.jpg",
        instructions: [
            "Start in plank position with forearms on the ground",
            "Keep body in a straight line from head to feet",
            "Engage abdominal and core muscles",
            "Maintain natural breathing",
            "Hold this position for as long as possible"
        ],
        reps: "30-60 seconds",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 10,
        name: "Crunches",
        category: "core",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Abs", "Core"],
        description: "Basic exercise to strengthen upper abdominal muscles",
        image: "./assets/images/young-sporty-woman-doing-crisscross-exercise.jpg",
        instructions: [
            "Lie on your back with knees bent",
            "Place hands behind head or on chest",
            "Lift upper body toward knees",
            "Make sure to use abdominal muscles, not neck",
            "Lower slowly to starting position"
        ],
        reps: "15-25 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },

    // Upper Body Exercises
    {
        id: 11,
        name: "Dumbbell Shoulder Press",
        category: "upper-body",
        difficulty: "intermediate",
        duration: "10-15 minutes",
        equipment: "dumbbells",
        muscles: ["Shoulders", "Arms", "Core"],
        description: "Exercise to strengthen shoulder and arm muscles",
        image: "./assets/images/front-view-fit-man-with-tank-top-holding-up-weights.jpg",
        instructions: [
            "Stand with feet shoulder-width apart",
            "Hold dumbbells in each hand",
            "Raise weights to shoulder level",
            "Press weights overhead",
            "Lower weights slowly to starting position"
        ],
        reps: "8-12 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 12,
        name: "Pull-ups",
        category: "upper-body",
        difficulty: "advanced",
        duration: "10-15 minutes",
        equipment: "pull-up-bar",
        muscles: ["Back", "Arms", "Shoulders"],
        description: "Advanced exercise to strengthen back and arm muscles",
        image: "./assets/images/back-view-woman-performing-pull-ups.jpg",
        instructions: [
            "Grip pull-up bar with hands wider than shoulder-width",
            "Hang from bar with arms fully extended",
            "Pull body up until chin touches the bar",
            "Lower slowly to starting position",
            "Keep body straight throughout the exercise"
        ],
        reps: "5-10 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    },

    // Lower Body Exercises
    {
        id: 13,
        name: "Lunges",
        category: "lower-body",
        difficulty: "intermediate",
        duration: "10-15 minutes",
        equipment: "bodyweight",
        muscles: ["Legs", "Glutes", "Core"],
        description: "Excellent exercise to strengthen leg and glute muscles",
        image: "./assets/images/slim-sporty-woman-working-out-making-lunges-indoors.jpg",
        instructions: [
            "Stand with feet hip-width apart",
            "Step forward with right foot",
            "Lower slowly until right knee is at 90 degrees",
            "Push with right foot to return to starting position",
            "Repeat with left foot"
        ],
        reps: "10-15 reps per leg",
        sets: "3-4 sets",
        videoUrl: "#"
    },
    {
        id: 14,
        name: "Glute Bridges",
        category: "lower-body",
        difficulty: "beginner",
        duration: "5-10 minutes",
        equipment: "bodyweight",
        muscles: ["Glutes", "Legs", "Core"],
        description: "Effective exercise to strengthen glute and leg muscles",
        image: "./assets/images/athletic-middle-age-man-doing-stomach-workouts-home.jpg",
        instructions: [
            "Lie on your back with knees bent",
            "Place feet on the ground hip-width apart",
            "Lift hips off the ground until body forms a straight line",
            "Squeeze glute muscles at the top of the movement",
            "Lower slowly to starting position"
        ],
        reps: "15-20 reps",
        sets: "3-4 sets",
        videoUrl: "#"
    }
];

// DOM Elements
const exerciseNavItems = document.querySelectorAll('.exercise-nav-item');
const exerciseCategories = document.querySelectorAll('.exercise-category');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayExercisesByCategory();
    setupEventListeners();
});

// Display exercises by category
function displayExercisesByCategory() {
    const categories = ['cardio', 'strength', 'flexibility', 'core', 'upper-body', 'lower-body'];
    
    categories.forEach(category => {
        const categoryExercises = exercisesData.filter(exercise => exercise.category === category);
        const categoryContainer = document.getElementById(`${category}-exercises`);
        
        if (categoryContainer) {
            categoryContainer.innerHTML = '';
            
            categoryExercises.forEach(exercise => {
                const exerciseCard = createExerciseCard(exercise);
                categoryContainer.appendChild(exerciseCard);
            });
        }
    });
}

// Create exercise card element
function createExerciseCard(exercise) {
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.onclick = () => viewExerciseDetail(exercise.id);
    
    const difficultyClass = `difficulty-${exercise.difficulty}`;
    const difficultyText = getDifficultyText(exercise.difficulty);
    
    card.innerHTML = `
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
                <a href="#" class="view-exercise-btn" onclick="event.stopPropagation(); viewExerciseDetail(${exercise.id})">View Details</a>
            </div>
        </div>
    `;
    
    return card;
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

// Setup event listeners
function setupEventListeners() {
    // Exercise navigation items
    exerciseNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            exerciseNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Scroll to category if it's a category link
            const category = this.dataset.category;
            if (category) {
                const targetSection = document.getElementById(category);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// View exercise detail
function viewExerciseDetail(exerciseId) {
    const exercise = exercisesData.find(ex => ex.id === exerciseId);
    if (exercise) {
        // Store exercise data in sessionStorage for the detail page
        sessionStorage.setItem('selectedExercise', JSON.stringify(exercise));
        // Navigate to exercise detail page
        window.location.href = `exercise-detail.html?id=${exerciseId}`;
    }
}

// Search functionality
function searchExercises(searchTerm) {
    const filteredExercises = exercisesData.filter(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.muscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Display search results in a temporary container
    // This would need to be implemented based on your search UI
    console.log('Search results:', filteredExercises);
}
