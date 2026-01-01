// Elements
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const firstCrackBtn = document.getElementById('firstCrackBtn');
const resetBtn = document.getElementById('resetBtn');

const fcTimeDisplay = document.getElementById('fcTime');
const devTimeDisplay = document.getElementById('devTimeDisplay');
const dtrDisplay = document.getElementById('dtrDisplay');

const greenWeightInput = document.getElementById('greenWeight');
const roastWeightInput = document.getElementById('roastWeight');
const weightLossDisplay = document.getElementById('weightLossDisplay');
const dateDisplay = document.getElementById('dateDisplay');

// State
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let firstCrackTime = null; // in seconds relative to start

// Constants
const PROJECTION_PERCENTAGES = [0.15, 0.175, 0.20, 0.225, 0.25];

// Initialize
function init() {
    const now = new Date();
    dateDisplay.textContent = now.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    startBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    firstCrackBtn.addEventListener('click', recordFirstCrack);
    
    greenWeightInput.addEventListener('input', calculateWeightLoss);
    roastWeightInput.addEventListener('input', calculateWeightLoss);
}

// Timer Logic
function toggleTimer() {
    if (isRunning) {
        // Stop
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = 'Resume Roast';
        startBtn.classList.remove('running');
        // Disable FC button if stopped? usually yes, or keep it enabled if they missed it. 
        // Let's keep it enabled if we have started > 0.
    } else {
        // Start
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 100);
        isRunning = true;
        startBtn.textContent = 'Stop Roast';
        startBtn.classList.add('running');
        firstCrackBtn.disabled = false;
    }
}

function updateTimer() {
    const now = Date.now();
    elapsedTime = now - startTime;
    updateDisplay();
}

function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    timerDisplay.textContent = formatTime(totalSeconds);

    if (firstCrackTime !== null) {
        const currentDevTime = (elapsedTime / 1000) - firstCrackTime;
        devTimeDisplay.textContent = formatTime(Math.floor(currentDevTime));
        
        // Calculate DTR
        // DTR = (Total Time - FC Time) / Total Time
        // Which is equivalent to DevTime / TotalTime
        const dtr = totalSeconds > 0 ? (currentDevTime / totalSeconds) * 100 : 0;
        dtrDisplay.textContent = dtr.toFixed(1) + '%';
    }
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function resetTimer() {
    if (confirm('Are you sure you want to reset the roast data?')) {
        clearInterval(timerInterval);
        isRunning = false;
        startTime = 0;
        elapsedTime = 0;
        firstCrackTime = null;
        
        timerDisplay.textContent = '00:00';
        startBtn.textContent = 'Start Roast';
        startBtn.classList.remove('running');
        firstCrackBtn.disabled = true;
        firstCrackBtn.textContent = 'First Crack';
        firstCrackBtn.classList.remove('active');
        
        fcTimeDisplay.textContent = '--:--';
        devTimeDisplay.textContent = '00:00';
        dtrDisplay.textContent = '0.0%';
        
        // Clear projections
        document.querySelectorAll('.proj-time').forEach(el => el.textContent = '--:--');
    }
}

function recordFirstCrack() {
    if (!isRunning && elapsedTime === 0) return;
    
    if (firstCrackTime === null) {
        firstCrackTime = elapsedTime / 1000; // Store in seconds
        fcTimeDisplay.textContent = formatTime(Math.floor(firstCrackTime));
        firstCrackBtn.disabled = true; 
        firstCrackBtn.textContent = 'FC Recorded';
        
        calculateProjections();
    }
}

function calculateProjections() {
    if (firstCrackTime === null) return;

    // Formula: TargetTotalTime = FC_Time / (1 - Percentage)
    PROJECTION_PERCENTAGES.forEach(pct => {
        // pct is 0.15 for 15%
        // If roast ends at TargetTotalTime, then (TargetTotalTime - FC_Time) / TargetTotalTime = pct
        // 1 - FC/Target = pct => FC/Target = 1 - pct => Target = FC / (1 - pct)
        
        const targetTotalSeconds = firstCrackTime / (1 - pct);
        const elId = `proj${pct * 100}`.replace('.', '');
        // e.g. proj15, proj175, proj20
        
        const el = document.getElementById(elId);
        if (el) {
            el.textContent = formatTime(Math.floor(targetTotalSeconds));
        }
    });
}

function calculateWeightLoss() {
    const green = parseFloat(greenWeightInput.value);
    const roast = parseFloat(roastWeightInput.value);

    if (green > 0 && roast > 0) {
        const loss = ((green - roast) / green) * 100;
        weightLossDisplay.textContent = loss.toFixed(2) + '%';
    } else {
        weightLossDisplay.textContent = '0.00%';
    }
}

// Start
init();
