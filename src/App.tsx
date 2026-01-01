import { useState, useEffect, useRef } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid, Stack } from '@mui/material';
import { MAX_ROAST_TIME, PROJECTION_PERCENTAGES } from './constants';
import { lightTheme } from './theme';
import type { RoastLog, RecipeStep } from './types';
import { formatTime } from './utils/timeFormat';

// Components
import { Header } from './components/Header';
import { RoastTimer } from './components/RoastTimer';
import { RoastMetrics } from './components/RoastMetrics';
import { RoastForm } from './components/RoastForm';
import { RecipeCard } from './components/RecipeCard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { RecipeDialog } from './components/RecipeDialog';

export default function App() {
  // --- State ---
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // in milliseconds
  const [startTime, setStartTime] = useState<number>(0);

  // Phase Milestones (in seconds)
  const [dryEndTime, setDryEndTime] = useState<number | null>(null);
  const [firstCrackTime, setFirstCrackTime] = useState<number | null>(null);

  // Roast Data
  const [beanName, setBeanName] = useState('');
  const [greenWeight, setGreenWeight] = useState<string>('');
  const [roastWeight, setRoastWeight] = useState<string>('');

  // History / Persistence
  const [roastHistory, setRoastHistory] = useState<RoastLog[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Recipe
  const [recipeSteps, setRecipeSteps] = useState<RecipeStep[]>([]);
  const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // --- Date ---
  const currentDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // --- Persistence Handlers ---
  useEffect(() => {
    const saved = localStorage.getItem('roastHistory');
    if (saved) {
      try {
        setRoastHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse roast history', e);
      }
    }
  }, []);

  const saveToHistory = (newLog: RoastLog) => {
    const updated = [newLog, ...roastHistory];
    setRoastHistory(updated);
    localStorage.setItem('roastHistory', JSON.stringify(updated));
  };

  const deleteRoast = (id: string) => {
    const updated = roastHistory.filter(r => r.id !== id);
    setRoastHistory(updated);
    localStorage.setItem('roastHistory', JSON.stringify(updated));
  };

  // --- Timer Operations ---
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTime);
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, startTime]);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      setStartTime(Date.now() - elapsedTime);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    if (confirm('Are you sure you want to reset the roast data?')) {
      setIsRunning(false);
      setElapsedTime(0);
      setStartTime(0);
      setDryEndTime(null);
      setFirstCrackTime(null);
      setBeanName('');
      setGreenWeight('');
      setRoastWeight('');
    }
  };

  // --- Milestone Actions ---
  const recordDryEnd = () => {
    if (!isRunning && elapsedTime === 0) return;
    if (dryEndTime === null) {
      setDryEndTime(elapsedTime / 1000);
    }
  };

  const recordFirstCrack = () => {
    if (!isRunning && elapsedTime === 0) return;
    if (firstCrackTime === null) {
      setFirstCrackTime(elapsedTime / 1000);
    }
  };

  // --- Calculations ---
  const totalSeconds = Math.floor(elapsedTime / 1000);

  const currentDevTime = firstCrackTime !== null ? (elapsedTime / 1000) - firstCrackTime : 0;

  const dtr = totalSeconds > 0 && firstCrackTime !== null
    ? (currentDevTime / totalSeconds) * 100
    : 0;

  const calculateProjections = (fcTime: number) => {
    return PROJECTION_PERCENTAGES.map(pct => {
      const targetTotalSeconds = fcTime / (1 - pct);
      return {
        label: `${(pct * 100).toFixed(1)}%`,
        time: formatTime(Math.floor(targetTotalSeconds))
      };
    });
  };

  const projections = firstCrackTime !== null ? calculateProjections(firstCrackTime) : [];

  const calculateWeightLoss = () => {
    const green = parseFloat(greenWeight);
    const roast = parseFloat(roastWeight);
    if (green > 0 && roast > 0) {
      const loss = ((green - roast) / green) * 100;
      return `${loss.toFixed(2)}%`;
    }
    return '0.00%';
  };

  const handleSaveRoast = () => {
    if (!beanName) {
      alert('Please enter a bean name before saving.');
      return;
    }

    const newRoast: RoastLog = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      dateStr: currentDate,
      beanName,
      greenWeight,
      roastWeight,
      totalSeconds,
      dryEndTime,
      firstCrackTime,
      dtr,
      weightLoss: calculateWeightLoss()
    };

    saveToHistory(newRoast);
    setIsHistoryOpen(true); // Open drawer to confirm save
  };

  // --- Phase Logic ---
  // Default to Drying
  let currentPhase = 'Drying';
  let phaseColor: 'info' | 'warning' | 'error' | 'success' | 'primary' = 'success'; // Green for green beans (drying)

  if (dryEndTime !== null && firstCrackTime === null) {
    currentPhase = 'Maillard';
    phaseColor = 'warning'; // Yellow/Orange/Brown
  } else if (firstCrackTime !== null) {
    currentPhase = 'Development';
    phaseColor = 'error'; // Red (Roasting hot)
  }

  // Progress Bar Visualization
  const progress = Math.min((elapsedTime / 1000 / MAX_ROAST_TIME) * 100, 100);

  // --- Recipe Handlers ---
  const handleAddStep = () => {
    setRecipeSteps([...recipeSteps, { id: crypto.randomUUID(), title: '', temperature: '', time: '' }]);
  };

  const handleUpdateStep = (id: string, field: keyof RecipeStep, value: string) => {
    setRecipeSteps(recipeSteps.map(step =>
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const handleRemoveStep = (id: string) => {
    setRecipeSteps(recipeSteps.filter(s => s.id !== id));
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Header
            onOpenRecipeDialog={() => setIsRecipeDialogOpen(true)}
            onOpenHistory={() => setIsHistoryOpen(true)}
          />

          {/* Left Column: Timer & Controls */}
          <RoastTimer
            totalSeconds={totalSeconds}
            currentPhase={currentPhase}
            phaseColor={phaseColor}
            progress={progress}
            isRunning={isRunning}
            elapsedTime={elapsedTime}
            onToggleTimer={toggleTimer}
            onResetTimer={resetTimer}
            onRecordDryEnd={recordDryEnd}
            onRecordFirstCrack={recordFirstCrack}
            dryEndTime={dryEndTime}
            firstCrackTime={firstCrackTime}
          />

          {/* Right Column: Data & Metrics */}
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <Stack spacing={3}>
              <RecipeCard
                steps={recipeSteps}
                onEdit={() => setIsRecipeDialogOpen(true)}
              />

              <RoastMetrics
                dryEndTime={dryEndTime}
                firstCrackTime={firstCrackTime}
                currentDevTime={currentDevTime}
                dtr={dtr}
                projections={projections}
              />

              <RoastForm
                beanName={beanName}
                setBeanName={setBeanName}
                greenWeight={greenWeight}
                setGreenWeight={setGreenWeight}
                roastWeight={roastWeight}
                setRoastWeight={setRoastWeight}
                weightLoss={calculateWeightLoss()}
                currentDate={currentDate}
                onSave={handleSaveRoast}
                isSaveDisabled={totalSeconds === 0}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <HistoryDrawer
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={roastHistory}
        onDelete={deleteRoast}
      />

      <RecipeDialog
        open={isRecipeDialogOpen}
        onClose={() => setIsRecipeDialogOpen(false)}
        steps={recipeSteps}
        onAddStep={handleAddStep}
        onUpdateStep={handleUpdateStep}
        onRemoveStep={handleRemoveStep}
      />
    </ThemeProvider>
  );
}
