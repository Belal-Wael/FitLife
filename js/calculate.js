// BMI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const bmiForm = document.getElementById('bmiForm');
    const calorieForm = document.getElementById('calorieForm');
    
    // BMI Calculator
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
    }
    
    // Calorie Calculator
    if (calorieForm) {
        calorieForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateCalories();
        });
    }
});

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;
    
    if (!height || !weight || !gender) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Determine BMI category
    let category, color, advice;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-warning';
        advice = 'Consider gradually increasing your weight through healthy, calorie-dense foods rich in protein and nutrients.';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        color = 'text-success';
        advice = 'Excellent! Your weight is in the healthy range. Maintain a balanced diet and regular exercise routine.';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        color = 'text-warning';
        advice = 'Consider gradually losing weight through calorie reduction and increased physical activity.';
    } else {
        category = 'Obese';
        color = 'text-danger';
        advice = 'It\'s recommended to consult with a doctor or nutritionist to develop a safe and healthy weight loss plan.';
    }
    
    // Display result
    const resultDiv = document.getElementById('bmiResult');
    const adviceDiv = document.getElementById('bmiAdvices');
    
    resultDiv.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title ${color}">${bmi.toFixed(1)}</h4>
                <p class="card-text">${category}</p>
                <div class="progress mb-3">
                    <div class="progress-bar ${getProgressBarClass(bmi)}" role="progressbar" 
                         style="width: ${Math.min((bmi / 40) * 100, 100)}%">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    adviceDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Health Tips:</h5>
                <p class="card-text">${advice}</p>
            </div>
        </div>
    `;
}

function calculateCalories() {
    const age = parseFloat(document.getElementById('age').value);
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
    
    if (!age || !height || !weight || !gender || !activity || !goal) {
        alert('Please fill in all fields');
        return;
    }
    
    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    
    // Calculate Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activity;
    
    // Calculate target calories based on goal
    let targetCalories, goalText;
    switch(goal) {
        case 'lose':
            targetCalories = tdee - 500; // 500 calorie deficit for weight loss
            goalText = 'Weight Loss';
            break;
        case 'maintain':
            targetCalories = tdee;
            goalText = 'Weight Maintenance';
            break;
        case 'gain':
            targetCalories = tdee + 500; // 500 calorie surplus for weight gain
            goalText = 'Weight Gain';
            break;
    }
    
    // Display result
    const resultDiv = document.getElementById('calorieResult');
    const adviceDiv = document.getElementById('calorieAdvices');
    
    resultDiv.innerHTML = `
        <div class="card">
            <div class="card-body text-center">
                <h4 class="card-title text-primary">${Math.round(targetCalories)}</h4>
                <p class="card-text">calories per day</p>
                <hr>
                <div class="row text-center">
                    <div class="col-6">
                        <h6>Basal Metabolic Rate</h6>
                        <p class="text-muted">${Math.round(bmr)} calories</p>
                    </div>
                    <div class="col-6">
                        <h6>Total Daily Energy</h6>
                        <p class="text-muted">${Math.round(tdee)} calories</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Tips based on goal
    let advice = '';
    switch(goal) {
        case 'lose':
            advice = `
                <h6>Weight Loss Tips:</h6>
                <ul>
                    <li>Consume ${Math.round(targetCalories)} calories daily</li>
                    <li>Exercise 3-5 times per week</li>
                    <li>Include protein in every meal</li>
                    <li>Drink plenty of water</li>
                    <li>Avoid processed foods and sugars</li>
                </ul>
            `;
            break;
        case 'maintain':
            advice = `
                <h6>Weight Maintenance Tips:</h6>
                <ul>
                    <li>Consume ${Math.round(targetCalories)} calories daily</li>
                    <li>Exercise regularly</li>
                    <li>Eat a balanced diet</li>
                    <li>Monitor your weight weekly</li>
                    <li>Get adequate sleep</li>
                </ul>
            `;
            break;
        case 'gain':
            advice = `
                <h6>Weight Gain Tips:</h6>
                <ul>
                    <li>Consume ${Math.round(targetCalories)} calories daily</li>
                    <li>Do strength training to build muscle</li>
                    <li>Eat frequent small meals</li>
                    <li>Add nuts and avocado to your meals</li>
                    <li>Consume protein after workouts</li>
                </ul>
            `;
            break;
    }
    
    adviceDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${goalText} Plan:</h5>
                ${advice}
            </div>
        </div>
    `;
}

function getProgressBarClass(bmi) {
    if (bmi < 18.5) return 'bg-warning';
    if (bmi >= 18.5 && bmi < 25) return 'bg-success';
    if (bmi >= 25 && bmi < 30) return 'bg-warning';
    return 'bg-danger';
}
