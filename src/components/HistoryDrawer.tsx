import { Drawer, Box, Typography, IconButton, List, Card, CardContent, Grid } from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { RoastLog } from '../types';
import { formatTime } from '../utils/timeFormat';

interface HistoryDrawerProps {
    open: boolean;
    onClose: () => void;
    history: RoastLog[];
    onDelete: (id: string) => void;
}

export const HistoryDrawer = ({ open, onClose, history, onDelete }: HistoryDrawerProps) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 400 }, p: 0, bgcolor: '#f8fafc' }
            }}
        >
            <Box p={3} display="flex" justifyContent="space-between" alignItems="center" bgcolor="white" borderBottom="1px solid #e2e8f0">
                <Typography variant="h5" fontWeight="700">Roast History</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List sx={{ p: 2 }}>
                {history.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                        No roasts saved yet.
                    </Typography>
                ) : (
                    history.map((roast) => (
                        <Card key={roast.id} sx={{ mb: 2, overflow: 'visible' }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography variant="h6" fontSize="1rem" fontWeight="bold">{roast.beanName}</Typography>
                                    <IconButton size="small" onClick={() => onDelete(roast.id)} color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                                    {roast.dateStr}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">Total Time</Typography>
                                        <Typography variant="body2" fontWeight="600">{formatTime(roast.totalSeconds)}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">DTR</Typography>
                                        <Typography variant="body2" fontWeight="600">{roast.dtr.toFixed(1)}%</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">Weight Loss</Typography>
                                        <Typography variant="body2" fontWeight="600">{roast.weightLoss}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography variant="caption" color="text.secondary">Est. Phase</Typography>
                                        <Typography variant="body2" fontWeight="600">
                                            {roast.firstCrackTime ? 'Developed' : (roast.dryEndTime ? 'Maillard' : 'Drying')}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))
                )}
            </List>
        </Drawer>
    );
};
