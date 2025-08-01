import React, { useState } from 'react'
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
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
} from '@mui/material'
import {
    LockOutlined,
    PersonOutline,
    Visibility,
    VisibilityOff,
    EmailOutlined,
    Phone as PhoneIcon
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useNavigate, Link } from 'react-router-dom'
import dayjs from 'dayjs'

import { PATHS } from '@/routers/path'
import { register } from '@/services/auth'

const RegisterPage = () => {
    const navigate = useNavigate()
    const theme = useTheme()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        dob: '',
        phone_number: '',
    })

    const handleChange = (prop) => (e) => {
        const value = e?.target?.value ?? e
        setValues((prev) => ({ ...prev, [prop]: value }))
    }

    const handleDateChange = (date) => {
        setValues((prev) => ({
            ...prev,
            dob: date ? date.format('YYYY-MM-DD') : '',
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setSuccess('')
        setSubmitLoading(true)

        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match.')
            setSubmitLoading(false)
            return
        }

        try {
            const response = await register(values)
            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...')
                setTimeout(() => navigate(PATHS.login), 2000)
            }
        } catch (e) {
            setError(e.response?.data?.message || 'Registration failed. Please try again.')
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
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Card
                sx={{
                    width: 400,
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Typography variant="h5" fontWeight="bold" mb={1}>
                    Create an account
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                    Fill in your details to create a new account.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        variant="outlined"
                        value={values.name}
                        onChange={handleChange('name')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlined color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                        required
                    />

                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <FormLabel sx={{ minWidth: 80, mr: 2 }}>Gender</FormLabel>
                        <RadioGroup
                            row
                            value={values.gender}
                            onChange={handleChange('gender')}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </Box>

                    <DatePicker
                        label="Date of Birth"
                        value={values.dob ? dayjs(values.dob) : null}
                        onChange={handleDateChange}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                variant: 'outlined',
                                required: true,
                                sx: { mb: 2 },
                            }
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        variant="outlined"
                        value={values.phone_number}
                        onChange={handleChange('phone_number')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                        required
                        type="tel"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
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
                            textTransform: 'none',
                            fontWeight: 'bold',
                            py: 1.5,
                        }}
                    >
                        {submitLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <Typography variant="body2" mt={2}>
                    Already have an account?{' '}
                    <Link
                        to={PATHS.login}
                        style={{
                            textDecoration: 'none',
                            color: theme.palette.primary.main,
                        }}
                    >
                        Login
                    </Link>
                </Typography>
            </Card>
        </Box>
    )
}

export default RegisterPage
