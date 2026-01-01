import { Box, Typography, Button, Grid } from '@mui/material';
import { ReceiptLong as RecipeIcon, History as HistoryIcon } from '@mui/icons-material';

interface HeaderProps {
    onOpenRecipeDialog: () => void;
    onOpenHistory: () => void;
}

export const Header = ({ onOpenRecipeDialog, onOpenHistory }: HeaderProps) => (
    <Grid size={{ xs: 12 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="700" letterSpacing="-0.02em">
                Roast Master <Box component="span" sx={{ fontSize: '0.7em', bgcolor: 'rgba(59,130,246,0.2)', color: '#60a5fa', px: 1, py: 0.2, borderRadius: 2, ml: 1 }}>v3.0</Box>
            </Typography>
            <Box>
                <Button
                    startIcon={<RecipeIcon />}
                    onClick={onOpenRecipeDialog}
                    variant="outlined"
                    sx={{ borderRadius: 2, mr: 1 }}
                >
                    Plan Recipe
                </Button>
                <Button
                    startIcon={<HistoryIcon />}
                    onClick={onOpenHistory}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                >
                    History
                </Button>
            </Box>
        </Box>
    </Grid>
);
