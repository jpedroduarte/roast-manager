import { Drawer, Box, Typography, IconButton, List, Card, CardContent } from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { RoastLog } from '../types';
import { formatTime } from '../utils/timeFormat';

interface HistoryDrawerProps {
    open: boolean;
    onClose: () => void;
    history: RoastLog[];
    onDelete: (id: string) => void;
}

const RoastTimelineBar = ({ roast }: { roast: RoastLog }) => {
    const { totalSeconds, dryEndTime, firstCrackTime } = roast;
    if (!totalSeconds) return null;

    const dry = dryEndTime || totalSeconds;
    const maillard = firstCrackTime ? (firstCrackTime - dry) : (dryEndTime ? totalSeconds - dry : 0);
    const dev = firstCrackTime ? totalSeconds - firstCrackTime : 0;

    const dryPct = (dry / totalSeconds) * 100;
    const maillardPct = (maillard / totalSeconds) * 100;
    const devPct = (dev / totalSeconds) * 100;

    return (
        <Box sx={{ width: '100%', my: 2 }}>
            <Box sx={{ width: '100%', display: 'flex', mb: 0.5 }}>
                {dryPct > 0 && <Typography variant="caption" sx={{ width: `${dryPct}%`, textAlign: 'center', fontSize: '0.7rem', color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>{formatTime(dry)}</Typography>}
                {maillardPct > 0 && <Typography variant="caption" sx={{ width: `${maillardPct}%`, textAlign: 'center', fontSize: '0.7rem', color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>{formatTime(maillard)}</Typography>}
                {devPct > 0 && <Typography variant="caption" sx={{ width: `${devPct}%`, textAlign: 'center', fontSize: '0.7rem', color: 'text.secondary', fontWeight: 500, lineHeight: 1 }}>{formatTime(dev)}</Typography>}
            </Box>

            <Box sx={{ width: '100%', height: 20, display: 'flex', borderRadius: 4, overflow: 'hidden' }}>
                {dryPct > 0 && (
                    <Box sx={{ width: `${dryPct}%`, bgcolor: 'success.main', transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {dryPct > 10 && <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'white', fontWeight: 700, lineHeight: 1 }}>DRY</Typography>}
                    </Box>
                )}
                {maillardPct > 0 && (
                    <Box sx={{ width: `${maillardPct}%`, bgcolor: 'warning.main', transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {maillardPct > 10 && <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'white', fontWeight: 700, lineHeight: 1 }}>MAI</Typography>}
                    </Box>
                )}
                {devPct > 0 && (
                    <Box sx={{ width: `${devPct}%`, bgcolor: 'error.main', transition: 'width 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {devPct > 10 && <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'white', fontWeight: 700, lineHeight: 1 }}>DEV</Typography>}
                    </Box>
                )}
            </Box>

            {/* Timeline Labels */}
            <Box sx={{ width: '100%', position: 'relative', mt: 0.5, height: 24 }}>
                {firstCrackTime && (
                    <Box
                        sx={{
                            position: 'absolute',
                            left: `${dryPct + maillardPct}%`,
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            lineHeight: 1
                        }}
                    >
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 800 }}>FC</Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 500 }}>
                            {formatTime(firstCrackTime)}
                        </Typography>
                    </Box>
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        lineHeight: 1
                    }}
                >
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 800 }}>End</Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 500 }}>
                        {formatTime(totalSeconds)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

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
            <Box p={2.5} display="flex" justifyContent="space-between" alignItems="center" bgcolor="white" borderBottom="1px solid #e2e8f0">
                <Typography variant="h6" fontWeight="700">Roast History</Typography>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            <List sx={{ p: 2 }}>
                {history.filter(r => !r.deletedAt).length === 0 ? (
                    <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                        No roasts saved yet.
                    </Typography>
                ) : (
                    history
                        .filter(r => !r.deletedAt)
                        .map((roast) => (
                        <Card key={roast.id} sx={{ mb: 2, overflow: 'visible', borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="700" lineHeight={1.2} mb={0.5}>
                                            {roast.beanName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block">
                                            {roast.dateStr}
                                        </Typography>
                                    </Box>
                                    <IconButton size="small" onClick={() => onDelete(roast.id)} color="error" sx={{ mt: -0.5, mr: -0.5 }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>

                                <RoastTimelineBar roast={roast} />

                                <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                                    <Box display="flex" alignItems="baseline" gap={0.5}>
                                        <Typography variant="caption" color="text.secondary">Development</Typography>
                                        <Typography variant="body2" fontWeight="600">{roast.developmentTimePct?.toFixed(1)}%</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="baseline" gap={0.5}>
                                        <Typography variant="caption" color="text.secondary">Weight loss</Typography>
                                        <Typography variant="body2" fontWeight="600">
                                            {typeof roast.weightLossPct === 'number' ? roast.weightLossPct.toFixed(1) : parseFloat(String(roast.weightLossPct) || '0').toFixed(1)}%
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                )}
            </List>
        </Drawer>
    );
};
