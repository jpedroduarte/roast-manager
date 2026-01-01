import { Card, CardContent, Box, Typography, Button, Grid } from '@mui/material';
import { ReceiptLong as RecipeIcon } from '@mui/icons-material';
import type { RecipeStep } from '../types';

interface RecipeCardProps {
    steps: RecipeStep[];
    onEdit: () => void;
}

export const RecipeCard = ({ steps, onEdit }: RecipeCardProps) => {
    if (steps.length === 0) return null;

    return (
        <Card sx={{ border: '1px solid #e2e8f0', bgcolor: '#f8fafc' }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center">
                        <RecipeIcon sx={{ mr: 1, fontSize: '1.2rem', color: 'primary.main' }} />
                        Active Recipe
                    </Typography>
                    <Button size="small" onClick={onEdit}>Edit</Button>
                </Box>
                <Grid container spacing={2}>
                    {steps.map((step, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={step.id}>
                            <Box
                                p={2}
                                bgcolor="white"
                                borderRadius={3}
                                boxShadow="0 2px 4px rgba(0,0,0,0.02)"
                                border="1px solid #f1f5f9"
                            >
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="caption" color="text.secondary" fontWeight="bold">STEP {index + 1}</Typography>
                                    {step.time && <Typography variant="caption" color="primary.main" fontWeight="bold">{step.time}</Typography>}
                                </Box>
                                <Typography variant="body1" fontWeight="600" mb={0.5}>{step.title}</Typography>
                                {step.temperature && (
                                    <Typography variant="body2" color="text.secondary">Target: {step.temperature}°</Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};
