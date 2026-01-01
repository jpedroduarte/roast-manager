import { Card, CardContent, Box, Typography, Chip, LinearProgress, Stack, Button, Grid, IconButton, keyframes } from '@mui/material';
import { Stop, PlayArrow, Opacity, LocalFireDepartment, RestartAlt } from '@mui/icons-material';
import { formatTime } from '../utils/timeFormat';

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

interface RoastTimerProps {
    totalSeconds: number;
    currentPhase: string;
    phaseColor: 'info' | 'warning' | 'error' | 'success' | 'primary';
    progress: number;
    isRunning: boolean;
    elapsedTime: number;
    onToggleTimer: () => void;
    onResetTimer: () => void;
    onRecordDryEnd: () => void;
    onRecordFirstCrack: () => void;
    dryEndTime: number | null;
    firstCrackTime: number | null;
}

export const RoastTimer = ({
    totalSeconds,
    currentPhase,
    phaseColor,
    progress,
    isRunning,
    elapsedTime,
    onToggleTimer,
    onResetTimer,
    onRecordDryEnd,
    onRecordFirstCrack,
    dryEndTime,
    firstCrackTime
}: RoastTimerProps) => (
    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', py: 4 }}>
            <CardContent>
                <Box mb={4} position="relative">
                    <Typography
                        variant="h1"
                        sx={{ fontSize: { xs: '4rem', md: '5rem', lg: '6rem' } }}
                    >
                        {formatTime(totalSeconds)}
                    </Typography>
                    <Chip
                        label={currentPhase}
                        color={phaseColor}
                        variant="filled"
                        sx={{ mt: 1, fontWeight: 'bold' }}
                    />
                </Box>

                {/* Progress Bar / Phase Indicator */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">00:00</Typography>
                        <Typography variant="caption" color="text.secondary">15:00</Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        color="primary"
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#e2e8f0',
                            '& .MuiLinearProgress-bar': {
                                transition: 'transform 0.1s linear',
                                backgroundColor: '#0f172a', // Primary Slate 900
                                backgroundImage: 'linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                                backgroundSize: '200% 100%',
                                animation: `${shimmerAnimation} 2s infinite linear`,
                            }
                        }}
                    />
                </Box>

                <Stack spacing={2} justifyContent="center">
                    {/* Main Timer Control */}
                    <Button
                        variant="contained"
                        size="large"
                        color={isRunning ? "error" : "primary"}
                        onClick={onToggleTimer}
                        startIcon={isRunning ? <Stop /> : <PlayArrow />}
                        sx={{ height: 56, fontSize: '1.2rem' }}
                    >
                        {isRunning ? 'Stop Roast' : (elapsedTime > 0 ? 'Resume' : 'Start Roast')}
                    </Button>

                    {/* Phase Controls */}
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 6 }}>
                            <Button
                                variant="outlined"
                                color="warning"
                                fullWidth
                                onClick={onRecordDryEnd}
                                disabled={dryEndTime !== null || elapsedTime === 0}
                                startIcon={<Opacity />}
                            >
                                {dryEndTime !== null ? formatTime(Math.floor(dryEndTime)) : 'Dry End'}
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 6 }}>
                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                                onClick={onRecordFirstCrack}
                                disabled={firstCrackTime !== null || elapsedTime === 0}
                                startIcon={<LocalFireDepartment />}
                            >
                                {firstCrackTime !== null ? formatTime(Math.floor(firstCrackTime)) : '1st Crack'}
                            </Button>
                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="center">
                        <IconButton onClick={onResetTimer} color="default" aria-label="reset">
                            <RestartAlt />
                        </IconButton>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    </Grid>
);
