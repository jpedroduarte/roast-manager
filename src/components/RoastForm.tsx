import { Card, CardContent, Typography, Grid, TextField, Box, Button } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

interface RoastFormProps {
    beanName: string;
    setBeanName: (name: string) => void;
    greenWeight: string;
    setGreenWeight: (weight: string) => void;
    roastWeight: string;
    setRoastWeight: (weight: string) => void;
    weightLoss: string;
    currentDate: string;
    onSave: () => void;
    isSaveDisabled: boolean;
}

export const RoastForm = ({
    beanName,
    setBeanName,
    greenWeight,
    setGreenWeight,
    roastWeight,
    setRoastWeight,
    weightLoss,
    currentDate,
    onSave,
    isSaveDisabled
}: RoastFormProps) => (
    <Card>
        <CardContent>
            <Typography variant="h2">Roast Data</Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label="Bean Name"
                        placeholder="e.g. Ethiopia Yirgacheffe"
                        variant="outlined"
                        value={beanName}
                        onChange={(e) => setBeanName(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 4 }}>
                    <TextField
                        fullWidth
                        label="Green (g)"
                        type="number"
                        value={greenWeight}
                        onChange={(e) => setGreenWeight(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 4 }}>
                    <TextField
                        fullWidth
                        label="Roast (g)"
                        type="number"
                        value={roastWeight}
                        onChange={(e) => setRoastWeight(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs: 4 }}>
                    <Box
                        height="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        bgcolor="rgba(16, 185, 129, 0.1)"
                        borderRadius={2}
                        border="1px solid rgba(16, 185, 129, 0.2)"
                    >
                        <Typography variant="caption" color="success.main">Weight Loss</Typography>
                        <Typography variant="h6" color="success.main" fontWeight="bold">
                            {weightLoss}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography color="text.secondary" variant="caption">
                        Date: {currentDate}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={onSave}
                        disabled={isSaveDisabled}
                    >
                        Save Roast Log
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
