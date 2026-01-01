import { Card, CardContent, Grid, Typography, Stack, Box } from '@mui/material';
import { formatTime } from '../utils/timeFormat';
import { PROJECTION_PERCENTAGES } from '../constants';

interface RoastMetricsProps {
    dryEndTime: number | null;
    firstCrackTime: number | null;
    currentDevTime: number;
    dtr: number;
    projections: { label: string; time: string }[];
}

export const RoastMetrics = ({ dryEndTime, firstCrackTime, currentDevTime, dtr, projections }: RoastMetricsProps) => (
    <Card>
        <CardContent>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h2">Milestones</Typography>
                    <Stack spacing={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.secondary">Dry End (Yellow)</Typography>
                            <Typography variant="mono" fontWeight="600">
                                {dryEndTime !== null ? formatTime(Math.floor(dryEndTime)) : '--:--'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.secondary">First Crack</Typography>
                            <Typography variant="mono" fontWeight="600">
                                {firstCrackTime !== null ? formatTime(Math.floor(firstCrackTime)) : '--:--'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.secondary">Development Time</Typography>
                            <Typography variant="mono" fontWeight="600" color="error.main">
                                {firstCrackTime !== null ? formatTime(Math.floor(currentDevTime)) : '00:00'}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography color="text.secondary">Dev Ratio (DTR)</Typography>
                            <Typography variant="mono" fontWeight="600">
                                {firstCrackTime !== null ? `${dtr.toFixed(1)}%` : '0.0%'}
                            </Typography>
                        </Box>
                    </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h2">Projections</Typography>
                    <Stack spacing={1}>
                        {PROJECTION_PERCENTAGES.map((pct, idx) => {
                            const projection = projections[idx];
                            return (
                                <Box
                                    key={pct}
                                    display="flex"
                                    justifyContent="space-between"
                                    p={1}
                                    bgcolor="rgba(255,255,255,0.03)"
                                    borderRadius={1}
                                >
                                    <Typography variant="body2" color="text.secondary">{(pct * 100).toFixed(1)}%</Typography>
                                    <Typography variant="mono">
                                        {projection ? projection.time : '--:--'}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);
