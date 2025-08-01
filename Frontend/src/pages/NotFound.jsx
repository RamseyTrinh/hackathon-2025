import { Box, Typography, Button, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

const NotFound = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
            px={2}
        >
            <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: 100, color: 'palette.secondary', mb: 2 }}
            />
            <Typography variant="h2" fontWeight="bold" color="palette.primary" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" color="palette.secondary" gutterBottom>
                Oops! Page not found.
            </Typography>
            <Typography variant="body1" color="palette.secondary" textAlign="center" maxWidth={400} mb={4}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/')}
                sx={{ textTransform: 'none', fontWeight: 'bold', px: 4, py: 1.5 }}
            >
                Go to Home
            </Button>
        </Box>
    )
}

export default NotFound
