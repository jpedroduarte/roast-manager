import { Dialog, DialogTitle, DialogContent, Box, TextField, Button, IconButton, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import type { RecipeStep } from '../types';

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    steps: RecipeStep[];
    onAddStep: () => void;
    onUpdateStep: (id: string, field: keyof RecipeStep, value: string) => void;
    onRemoveStep: (id: string) => void;
}

export const RecipeDialog = ({ open, onClose, steps, onAddStep, onUpdateStep, onRemoveStep }: RecipeDialogProps) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}
    >
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2} pb={0}>
            <DialogTitle fontWeight="bold" sx={{ p: 0 }}>Plan Roasting Recipe</DialogTitle>
            <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <DialogContent>
            <Box pt={1}>
                {steps.length === 0 ? (
                    <Box textAlign="center" py={4} bgcolor="#f8fafc" borderRadius={2} border="1px dashed #e2e8f0" mb={2}>
                        <Typography color="text.secondary">No steps yet. Add one to start planning!</Typography>
                    </Box>
                ) : (
                    <Stack spacing={2} mb={2}>
                        {steps.map((step, index) => (
                            <Box key={step.id} p={2} bgcolor="#f8fafc" borderRadius={2} position="relative">
                                <Box position="absolute" right={8} top={8}>
                                    <IconButton size="small" onClick={() => onRemoveStep(step.id)} color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography variant="subtitle2" color="text.secondary" mb={1}>Step {index + 1}</Typography>
                                <Stack spacing={2}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Title / Action"
                                        placeholder="e.g. Charge, Airflow adjustment"
                                        value={step.title}
                                        onChange={(e) => onUpdateStep(step.id, 'title', e.target.value)}
                                        sx={{ bgcolor: 'white' }}
                                    />
                                    <Stack direction="row" spacing={2}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Target Temp"
                                            placeholder="200°C"
                                            value={step.temperature}
                                            onChange={(e) => onUpdateStep(step.id, 'temperature', e.target.value)}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Target Time"
                                            placeholder="05:00"
                                            value={step.time}
                                            onChange={(e) => onUpdateStep(step.id, 'time', e.target.value)}
                                            sx={{ bgcolor: 'white' }}
                                        />
                                    </Stack>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )}
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={onAddStep}
                    sx={{ border: '2px dashed #e2e8f0', bgcolor: '#f1f5f9' }}
                >
                    Add Recipe Step
                </Button>
            </Box>
        </DialogContent>
    </Dialog>
);
