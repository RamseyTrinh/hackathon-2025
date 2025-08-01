import { useState } from 'react'
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Alert,
    Snackbar,
    useTheme,
} from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { updateNewPassword } from '@/services/user.js';

const ResetPasswordForm = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const { email, confirmToken } = location.state || {}

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    if (!email || !confirmToken) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <Typography variant="h6" color="error">
                    Invalid or missing data. Please go back to the reset page.
                </Typography>
            </Box>
        )
    }

    const handleSubmit = async () => {
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            setSnackbarOpen(true)
            return
        }

        setLoading(true)
        setError('')
        setSuccessMessage('')

        try {
            const response = await updateNewPassword({
                email,
                new_password: newPassword,
            })

            if (response?.status === 200) {
                setSuccessMessage(response?.data?.message || 'Password updated successfully!')
                setSnackbarOpen(true)

                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            } else {
                setError(response?.data?.message || 'Failed to update password.')
                setSnackbarOpen(true)
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Card
                sx={{
                    width: '400px',
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.text.primary }}
                >
                    Create New Password
                </Typography>

                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ mb: 3 }}
                    required
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ mb: 3 }}
                    required
                />

                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading || !newPassword || !confirmPassword}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                        color: theme.palette.primary.contrastText,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        py: 1.5,
                    }}
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </Button>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {successMessage ? (
                    <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="outlined">
                        {successMessage}
                    </Alert>
                ) : error ? (
                    <Alert onClose={() => setSnackbarOpen(false)} severity="error" variant="outlined">
                        {error}
                    </Alert>
                ) : null}
            </Snackbar>
        </Box>
    )
}

export default ResetPasswordForm
