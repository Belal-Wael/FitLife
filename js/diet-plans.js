// Diet Plans JavaScript Functions

// Global variables
let currentDiet = 'vegan';
let trackingData = {};

// Initialize the diet plans functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDietPlans();
    setupEventListeners();
    loadTrackingData();
});

// Initialize diet plans
function initializeDietPlans() {
    // Add smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Setup intersection observer for animations
    setupScrollAnimations();
    
    // Initialize diet type selector if exists
    const dietSelector = document.getElementById('diet-type-selector');
    if (dietSelector) {
        dietSelector.addEventListener('change', handleDietTypeChange);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Print button functionality
    const printButtons = document.querySelectorAll('.print-btn');
    printButtons.forEach(button => {
        button.addEventListener('click', handlePrint);
    });
    
    // Recipe modal functionality
    const recipeButtons = document.querySelectorAll('.recipe-card .btn');
    recipeButtons.forEach(button => {
        button.addEventListener('click', handleRecipeClick);
    });
    
    // Meal plan customization
    const mealPlanButtons = document.querySelectorAll('.meal-day');
    mealPlanButtons.forEach(button => {
        button.addEventListener('click', handleMealPlanClick);
    });
    
    // Tracking table inputs
    const trackingInputs = document.querySelectorAll('.tracking-table input');
    trackingInputs.forEach(input => {
        input.addEventListener('blur', saveTrackingData);
        input.addEventListener('input', debounce(saveTrackingData, 500));
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.tip-card, .recipe-card, .meal-day, .diet-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Handle diet type change
function handleDietTypeChange(event) {
    const selectedDiet = event.target.value;
    currentDiet = selectedDiet;
    
    // Update the page content based on selected diet
    updateDietContent(selectedDiet);
    
    // Save preference
    localStorage.setItem('selectedDiet', selectedDiet);
}

// Update diet content based on selection
function updateDietContent(dietType) {
    // This function would update the page content dynamically
    // For now, it's a placeholder for future functionality
    console.log(`Switched to ${dietType} diet`);
}

// Handle print functionality
function handlePrint() {
    // Hide elements that shouldn't be printed
    const elementsToHide = document.querySelectorAll('.navbar, .diet-nav, .print-btn, .btn:not(.print-btn), .back-to-home');
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });
    
    // Print the page
    window.print();
    
    // Restore hidden elements
    elementsToHide.forEach(element => {
        element.style.display = '';
    });
}

// Handle recipe click
function handleRecipeClick(event) {
    event.preventDefault();
    const recipeCard = event.target.closest('.recipe-card');
    const recipeTitle = recipeCard.querySelector('h3').textContent;
    
    // Show recipe modal or navigate to detailed recipe page
    showRecipeModal(recipeTitle, recipeCard);
}

// Show recipe modal
function showRecipeModal(title, recipeCard) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="recipeModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <img src="${recipeCard.querySelector('.recipe-image').src}" class="img-fluid rounded" alt="${title}">
                            </div>
                            <div class="col-md-6">
                                <h6>Ingredients:</h6>
                                <ul class="list-unstyled">
                                    ${recipeCard.querySelector('.recipe-ingredients ul').innerHTML}
                                </ul>
                                <h6>Instructions:</h6>
                                <p>This is a healthy and delicious recipe. Follow these steps:</p>
                                <ol>
                                    <li>Prepare all ingredients</li>
                                    <li>Follow basic cooking instructions</li>
                                    <li>Serve hot</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="addToMealPlan('${title}')">Add to Meal Plan</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('recipeModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
    modal.show();
}

// Handle meal plan click
function handleMealPlanClick(event) {
    const mealDay = event.target.closest('.meal-day');
    const dayName = mealDay.querySelector('h4').textContent;
    
    // Show meal plan customization modal
    showMealPlanModal(dayName, mealDay);
}

// Show meal plan customization modal
function showMealPlanModal(dayName, mealDay) {
    const modalHTML = `
        <div class="modal fade" id="mealPlanModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Customize ${dayName} Meals</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="mealPlanForm">
                            <div class="mb-3">
                                <label class="form-label">Breakfast:</label>
                                <textarea class="form-control" rows="2" placeholder="Write breakfast meal">${mealDay.querySelector('.meal-time:nth-child(2) p').textContent}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Lunch:</label>
                                <textarea class="form-control" rows="2" placeholder="Write lunch meal">${mealDay.querySelector('.meal-time:nth-child(3) p').textContent}</textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Dinner:</label>
                                <textarea class="form-control" rows="2" placeholder="Write dinner meal">${mealDay.querySelector('.meal-time:nth-child(4) p').textContent}</textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveMealPlan('${dayName}')">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('mealPlanModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('mealPlanModal'));
    modal.show();
}

// Save meal plan changes
function saveMealPlan(dayName) {
    const form = document.getElementById('mealPlanForm');
    const formData = new FormData(form);
    
    // Update the meal day display
    const mealDay = document.querySelector(`.meal-day h4:contains("${dayName}")`).closest('.meal-day');
    const meals = mealDay.querySelectorAll('.meal-time p');
    
    let index = 0;
    for (let [key, value] of formData.entries()) {
        if (meals[index]) {
            meals[index].textContent = value;
        }
        index++;
    }
    
    // Save to localStorage
    const mealPlanData = JSON.parse(localStorage.getItem('mealPlanData') || '{}');
    mealPlanData[dayName] = {
        breakfast: formData.get('breakfast') || '',
        lunch: formData.get('lunch') || '',
        dinner: formData.get('dinner') || ''
    };
    localStorage.setItem('mealPlanData', JSON.stringify(mealPlanData));
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('mealPlanModal'));
    modal.hide();
    
    // Show success message
    showNotification('Changes saved successfully!', 'success');
}

// Add recipe to meal plan
function addToMealPlan(recipeTitle) {
    // This function would add the recipe to a specific meal in the meal plan
    showNotification(`${recipeTitle} added to meal plan!`, 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('recipeModal'));
    modal.hide();
}

// Save tracking data
function saveTrackingData() {
    const inputs = document.querySelectorAll('.tracking-table input');
    const data = {};
    
    inputs.forEach(input => {
        const row = input.closest('tr');
        const day = row.cells[0].textContent.trim();
        const column = input.placeholder || input.type;
        
        if (!data[day]) {
            data[day] = {};
        }
        data[day][column] = input.value;
    });
    
    // Save to localStorage with diet-specific key
    const dietKey = getCurrentDietKey();
    localStorage.setItem(dietKey, JSON.stringify(data));
    
    // Show save notification
    showNotification('Data saved!', 'info');
}

// Load tracking data
function loadTrackingData() {
    const dietKey = getCurrentDietKey();
    const data = JSON.parse(localStorage.getItem(dietKey) || '{}');
    
    const inputs = document.querySelectorAll('.tracking-table input');
    inputs.forEach(input => {
        const row = input.closest('tr');
        const day = row.cells[0].textContent.trim();
        const column = input.placeholder || input.type;
        
        if (data[day] && data[day][column]) {
            input.value = data[day][column];
        }
    });
}

// Get current diet key for localStorage
function getCurrentDietKey() {
    const path = window.location.pathname;
    if (path.includes('vegan')) return 'veganTracking';
    if (path.includes('keto')) return 'ketoTracking';
    if (path.includes('mediterranean')) return 'mediterraneanTracking';
    if (path.includes('low-carb')) return 'lowCarbTracking';
    return 'dietTracking';
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global use
window.dietPlans = {
    saveTrackingData,
    loadTrackingData,
    showNotification,
    addToMealPlan,
    saveMealPlan
};
