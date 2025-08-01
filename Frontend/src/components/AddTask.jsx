import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Typography,
    useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

const priorityColors = {
    High: 'error.main',
    Medium: 'warning.main',
    Low: 'info.main',
}

const AddTask = ({ open, onClose, onCreate, selectedDate }) => {
    const theme = useTheme()
    const [error, setError] = useState(null)

    const [task, setTask] = useState({
        name: '',
        description: '',
        priority: 'High',
        start_date: selectedDate || null,
        due_date: null,
        user_id: null,
    })

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('INFO'))
        const userId = parseInt(userInfo?.user?.id)
        if (userId) {
            setTask(prev => ({ ...prev, user_id: userId }))
        }
        if (selectedDate) {
            setTask(prev => ({ ...prev, start_date: selectedDate }))
        }
    }, [selectedDate])

    const handleChange = (field) => (e) => {
        setTask((prev) => ({
            ...prev,
            [field]: e.target.value,
        }))
    }

    const handleDateChange = (field) => (date) => {
        const value = date ? dayjs(date).format('YYYY-MM-DD') : ''
        if (field === 'start_date' && selectedDate) {
            const formatted = dayjs(selectedDate).format('YYYY-MM-DD')
            if (value !== formatted) {
                setError('Cannot change start date when a date is selected')
                return
            }
        }
        setTask((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleOnClose = () => {
        setError(null)
        setTask({
            name: '',
            description: '',
            priority: 'High',
            start_date: selectedDate || null,
            due_date: null,
            user_id: task.user_id,
        })
        onClose()
    }

    const handleSubmit = () => {
        if (!task.name.trim() || !task.description.trim()) {
            setError('Name and description are required')
            return
        }
        if (!task.due_date) {
            setError('Due date is required')
            return
        }
        if (new Date(task.start_date) > new Date(task.due_date)) {
            setError('Start date cannot be after due date')
            return
        }
        if (!task.user_id) {
            setError('User ID is missing')
            return
        }

        onCreate(task)
        handleOnClose()
    }

    return (
        <>
            <Dialog open={open} onClose={handleOnClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: theme.palette.primary.main,
                }}>
                    Add New Task
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Name"
                        fullWidth
                        value={task.name}
                        onChange={handleChange('name')}
                        sx={{ mb: 2, mt: 1 }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={handleChange('description')}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Priority"
                        select
                        fullWidth
                        value={task.priority}
                        onChange={handleChange('priority')}
                        sx={{ mb: 2 }}
                        SelectProps={{
                            renderValue: (selected) => (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>{selected}</Typography>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: priorityColors[selected],
                                            borderRadius: '4px',
                                            ml: 1,
                                        }}
                                    />
                                </Box>
                            ),
                        }}
                    >
                        {['High', 'Medium', 'Low'].map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: (theme) =>
                                        theme.palette[priorityColors[option].split('.')[0]][priorityColors[option].split('.')[1]],
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        bgcolor: priorityColors[option],
                                        borderRadius: '4px',
                                    }}
                                />
                                <Typography>{option}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>

                    <DatePicker
                        label="Start Date"
                        value={task.start_date ? dayjs(task.start_date) : null}
                        onChange={handleDateChange('start_date')}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: { fullWidth: true, sx: { mb: 2 } }
                        }}
                    />
                    <DatePicker
                        label="Due Date"
                        value={task.due_date ? dayjs(task.due_date) : null}
                        onChange={handleDateChange('due_date')}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: { fullWidth: true }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleOnClose} color="error" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Add Task</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={Boolean(error)}
                autoHideDuration={3000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setError(null)} severity="error" variant="filled">
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTask
