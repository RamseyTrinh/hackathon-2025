import { useState } from 'react'
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    useTheme,
    Snackbar,
    Alert as MuiAlert,
    InputAdornment,
} from '@mui/material'
import { EmailOutlined, VerifiedOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { resetPassword, verifyCode } from '@/services/auth'

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    const [email, setEmail] = useState('')
    const [codeSent, setCodeSent] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [confirmToken, setConfirmToken] = useState('')

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    })

    const handleSendCode = async () => {
        setLoading(true)
        setSnackbar({ ...snackbar, open: false })
        try {
            const response = await resetPassword({ email: email.trim() })
            if (response?.status === 200) {
                setSnackbar({
                    open: true,
                    message: response?.data?.message || 'Verification code sent successfully!',
                    severity: 'success',
                })
                setConfirmToken(response?.data?.confirm_token || '')
                setCodeSent(true)
            } else {
                setSnackbar({
                    open: true,
                    message: response?.data?.message || 'Failed to send verification code.',
                    severity: 'error',
                })
            }
        } catch (e) {
            setSnackbar({
                open: true,
                message: 'Failed to send verification code. Try again.',
                severity: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        setLoading(true)
        setSnackbar({ ...snackbar, open: false })
        try {
            const response = await verifyCode({
                confirm_token: confirmToken,
                verification_code: verificationCode,
            })

            if (response?.status === 200) {
                setSnackbar({
                    open: true,
                    message: response?.data?.message || 'Verification successful!',
                    severity: 'success',
                })
                setSuccessMessage('Redirecting...')
                setTimeout(() => {
                    navigate('/reset-password-form', {
                        state: { email, confirmToken },
                    })
                }, 2000)
            } else {
                setSnackbar({
                    open: true,
                    message: response?.data?.message || 'Verification failed. Please check your code.',
                    severity: 'error',
                })
            }
        } catch (e) {
            setSnackbar({
                open: true,
                message: 'Verification failed. Please try again.',
                severity: 'error',
            })
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
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        mb: 1,
                        color: theme.palette.text.primary,
                        fontWeight: 'bold',
                    }}
                >
                    Reset Password
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                >
                    Enter your email to receive a verification code.
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 3 }}
                    required
                />

                {!codeSent ? (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSendCode}
                        disabled={loading || !email}
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
                        {loading ? 'Sending...' : 'Send Code'}
                    </Button>
                ) : successMessage === 'Redirecting...' ? (
                    <Typography
                        variant="body1"
                        sx={{ color: theme.palette.text.secondary, mt: 2 }}
                    >
                        Redirecting...
                    </Typography>
                ) : (
                    <Box>
                        <TextField
                            fullWidth
                            label="Verification Code"
                            placeholder="Enter the code"
                            variant="outlined"
                            value={verificationCode}
                            onChange={(e) =>
                                setVerificationCode(e.target.value)
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VerifiedOutlined
                                            sx={{
                                                color: theme.palette.text.secondary,
                                            }}
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 3 }}
                            required
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={handleVerifyCode}
                            disabled={loading || !verificationCode}
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
                            {loading ? 'Verifying...' : 'Verify Code'}
                        </Button>
                    </Box>
                )}
            </Card>

            {/* Snackbar */}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <MuiAlert
                    elevation={6}
                    variant="outlined"
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    )
}

export default ResetPasswordPage
