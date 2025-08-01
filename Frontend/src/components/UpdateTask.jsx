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
import dayjs from 'dayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const UpdateTask = ({ editTask, open, onClose, onUpdate }) => {
    const theme = useTheme()
    const priorityColors = {
        High: 'error.main',
        Medium: 'warning.main',
        Low: 'info.main',
    }

    const [error, setError] = useState(null)
    const [task, setTask] = useState({
        id: null,
        name: '',
        description: '',
        priority: 'Low',
        start_date: '',
        due_date: '',
        user_id: null,
    })

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('INFO'))
        const userId = parseInt(userInfo?.user?.id)
        if (userId) {
            setTask((prev) => ({
                ...prev,
                user_id: userId,
            }))
        }
    }, [])

    useEffect(() => {
        if (editTask) {
            setTask({
                ...editTask,
                start_date: editTask.start_date ? dayjs(editTask.start_date).format('YYYY-MM-DD') : '',
                due_date: editTask.due_date ? dayjs(editTask.due_date).format('YYYY-MM-DD') : '',
            })
        }
    }, [editTask])

    const handleChange = (field) => (e) => {
        setTask((prev) => ({
            ...prev,
            [field]: e.target.value,
        }))
    }

    const handleDateChange = (field) => (date) => {
        const formatted = date ? date.format('YYYY-MM-DD') : ''
        if (field === 'due_date') {
            const today = dayjs().startOf('day')
            if (date && date.isBefore(today)) {
                setError('Please select a valid due date')
                return
            }
        }
        setTask((prev) => ({
            ...prev,
            [field]: formatted,
        }))
    }

    const handleSubmit = () => {
        if (!task.name.trim() || !task.description.trim()) {
            setError('Name and description are required')
            return
        }
        if (!task.start_date) {
            setError('Start date is required')
            return
        }
        if (!task.due_date) {
            setError('Due date is required')
            return
        }

        onUpdate(task)
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                    }}
                >
                    Update Task
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={task.name}
                        onChange={handleChange('name')}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={handleChange('description')}
                    />
                    <TextField
                        margin="dense"
                        label="Priority"
                        select
                        fullWidth
                        value={task.priority}
                        onChange={handleChange('priority')}
                        sx={{ mb: 2 }}
                        SelectProps={{
                            renderValue: (selected) => (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                    color: theme.palette[priorityColors[option].split('.')[0]][priorityColors[option].split('.')[1]],
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
                            textField: {
                                fullWidth: true,
                                margin: 'dense',
                                required: true,
                            }
                        }}
                    />

                    <DatePicker
                        label="Due Date"
                        value={task.due_date ? dayjs(task.due_date) : null}
                        onChange={handleDateChange('due_date')}
                        format="DD/MM/YYYY"
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'dense',
                                required: true,
                            }
                        }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Update Task</Button>
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

export default UpdateTask
