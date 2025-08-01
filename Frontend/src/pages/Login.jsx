import { useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Card,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useTheme,
} from '@mui/material' // Import useTheme
import {
    LockOutlined,
    PersonOutline,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material'
import { PATHS } from '@/routers/path'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCurrentUserAction, loginAction } from '@/stores/authAction.js'

const LoginPage = () => {
    const theme = useTheme()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState('')
    const [values, setValues] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitLoading(true)

        try {
            const response = await dispatch(loginAction(values))

            if (loginAction.rejected.match(response)) {
                setError(
                    response.payload?.message ||
                        'Login failed. Please check your credentials.'
                )
                return
            }

            // Nếu login thành công
            navigate(PATHS.dashboard)
        } catch (e) {
            console.log('Unexpected error:', e)
            setError('Something went wrong.')
        } finally {
            setSubmitLoading(false)
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
                // Sử dụng màu nền mặc định của theme
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Card
                sx={{
                    width: '400px',
                    padding: 4,
                    textAlign: 'center',
                    // Sử dụng màu nền cho các "paper" của theme
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)', // Box shadow có thể giữ nguyên hoặc điều chỉnh tùy theme
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
                    Welcome to UEToDo Task
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 3, color: theme.palette.text.secondary }}
                >
                    Enter your credentials to access your account.
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        placeholder="Enter your email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 2,
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        placeholder="Enter your password"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setPasswordVisible(!passwordVisible)
                                        }
                                        edge="end"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        {passwordVisible ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            mb: 3,
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={submitLoading}
                        sx={{
                            mb: 2,
                            // Sử dụng màu primary của theme
                            backgroundColor: theme.palette.primary.main,
                            '&:hover': {
                                // Điều chỉnh màu hover dựa trên primary của theme
                                backgroundColor: theme.palette.primary.dark,
                            },
                            color: theme.palette.primary.contrastText, // Màu chữ tương phản với primary
                            fontWeight: 'bold',
                            textTransform: 'none',
                            py: 1.5,
                        }}
                    >
                        {submitLoading ? 'Logging In...' : 'Login'}
                    </Button>
                </form>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                    >
                        Don't have an account yet?{' '}
                        <Link
                            to="/sign-up"
                            size="small"
                            variant="text"
                            sx={{
                                textTransform: 'none',
                                p: 0,
                                color: theme.palette.primary.main, // Sử dụng màu primary của theme cho link
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                    color: theme.palette.primary.dark, // Màu hover cho link
                                },
                            }}
                        >
                            Register account
                        </Link>
                    </Typography>
                </Box>
                {/* Forgot password link outside the card, at the bottom of the page */}
                <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2">
                        <Link
                            to="/reset-password"
                            size="small"
                            variant="text"
                            sx={{
                                textTransform: 'none',
                                p: 0,
                                color: theme.palette.primary.main, // Sử dụng màu primary của theme cho link
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                    color: theme.palette.primary.dark, // Màu hover cho link
                                },
                            }}
                        >
                            Forgot password? Reset Password
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default LoginPage
