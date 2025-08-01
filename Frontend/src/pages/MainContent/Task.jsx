import React, { useState, useEffect } from 'react'
import {
    Box, Typography, List, ListItem, Toolbar, useTheme, IconButton, Button,
    Card, CardContent, Collapse, Alert, Snackbar, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'

import AddTask from '@/components/AddTask'
import TaskRow from '@/components/TaskRow'
import UpdateTask from '@/components/UpdateTask'
import { createTask, getTasksByUserId, updateTask, deleteTask } from '@/services/task'
import { useDispatch } from 'react-redux'
import { getCurrentUserAction } from '@/stores/authAction.js'
import dayjs from 'dayjs'

const Task = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    const [user, setUser] = useState({})
    const [expandedTasks, setExpandedTasks] = useState(true)
    const [expandedCompleted, setExpandedCompleted] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [tasks, setTasks] = useState([])
    const [alert, setAlert] = useState({})
    const [viewMode, setViewMode] = useState('list')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [editingTask, setEditingTask] = useState(null)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState({ open: false, taskId: null })

    const handleEditClick = (task) => {
        setEditingTask(task)
        setShowEditDialog(true)
    }

    const handleConfirmDelete = (taskId) => {
        setConfirmDelete({ open: true, taskId })
    }

    const handleDeleteTask = async () => {
        try {
            await deleteTask(confirmDelete.taskId)
            setConfirmDelete({ open: false, taskId: null })
            handleListTask()
            setAlert({ mssg: 'Task deleted successfully!', type: 'success' })
        } catch (error) {
            console.error(error)
            setAlert({ mssg: 'Failed to delete task.', type: 'error' })
        }
    }

    const handleUpdateTask = async (updatedTask) => {
        try {
            await updateTask(updatedTask.id, updatedTask)
            setAlert({ mssg: 'Task updated successfully!', type: 'success' })
            handleListTask()
            setShowEditDialog(false)
        } catch (err) {
            console.error(err)
            setAlert({ mssg: 'Failed to update task.', type: 'error' })
        }
    }

    const handleCreateTask = async (task) => {
        try {
            const response = await createTask(task)
            if (response?.success) {
                setAlert({ mssg: `Task created successfully!`, type: 'success' })
                setShowDialog(false)
                handleListTask()
            }
        } catch (error) {
            setAlert({ mssg: 'Failed to process task.', type: 'error' })
            console.error('Error saving task:', error)
        }
    }

    const handleListTask = async () => {
        try {
            const userId = user.id
            const response = await getTasksByUserId(userId, 1, 1000)
            setTasks(response?.data || [])
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const handleGetCurrentUser = async () => {
        try {
            const userInfo = await dispatch(getCurrentUserAction())
            setUser(userInfo?.payload?.user || {})
        } catch (error) {
            console.error('Error fetching current user:', error)
        }
    }

    const toggleTaskCompletion = async (id) => {
        const updatedTask = tasks.find((task) => task.id === id)
        const newStatus = !updatedTask.status
        try {
            await updateTask(id, { status: newStatus })
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status: newStatus } : task
                )
            )
        } catch (error) {
            console.error('Failed to update task status:', error)
        }
    }

    useEffect(() => {
        handleGetCurrentUser()
    }, [])

    useEffect(() => {
        if (user?.id) {
            handleListTask()
        }
    }, [user?.id])

    const unfinishedTasks = tasks.filter((task) => task.status === false)
    const completedTasks = tasks.filter((task) => task.status === true)

    const handleChangePage = (_, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const paginatedTasks = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {user?.name}'s tasks
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button variant="outlined">All ({tasks.length})</Button>
                        <IconButton><SearchIcon /></IconButton>
                        <IconButton onClick={() => setShowDialog(true)}><AddIcon /></IconButton>
                        {viewMode === 'list' ? (
                            <IconButton onClick={() => setViewMode('table')}><BackupTableIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => setViewMode('list')}><FormatListBulletedIcon /></IconButton>
                        )}
                    </Box>
                </Toolbar>

                {viewMode === 'list' ? (
                    <Card>
                        <CardContent sx={{ p: 0 }}>
                            {/* Header Row */}
                            <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.action.hover }}>
                                <Box sx={{ flexBasis: '20%' }}>Task name</Box>
                                <Box sx={{ flexBasis: '30%' }}>Description</Box>
                                <Box sx={{ flexBasis: '15%' }}>Priority</Box>
                                <Box sx={{ flexBasis: '15%' }}>Start date</Box>
                                <Box sx={{ flexBasis: '10%' }}>Due date</Box>
                                <Box sx={{ flexBasis: '10%' }}>Actions</Box>
                            </Box>

                            {/* Unfinished tasks */}
                            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedTasks(!expandedTasks)}>
                                    {expandedTasks ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                                        Unfinished tasks ({unfinishedTasks.length})
                                    </Typography>
                                </Box>
                                <Collapse in={expandedTasks}>
                                    <List disablePadding>
                                        {unfinishedTasks.map((task) => (
                                            <TaskRow
                                                key={task.id}
                                                task={task}
                                                onToggleStatus={toggleTaskCompletion}
                                                onEdit={handleEditClick}
                                                onDeleteTask={() => handleConfirmDelete(task.id)}
                                                onRefresh={handleListTask}
                                            />
                                        ))}
                                        <ListItem sx={{ py: 1, pl: 0 }}>
                                            <Button startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>Add task</Button>
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </Box>

                            {/* Completed tasks */}
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedCompleted(!expandedCompleted)}>
                                    {expandedCompleted ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                                        Completed tasks ({completedTasks.length})
                                    </Typography>
                                </Box>
                                <Collapse in={expandedCompleted}>
                                    <List disablePadding>
                                        {completedTasks.map((task) => (
                                            <TaskRow
                                                key={task.id}
                                                task={task}
                                                onToggleStatus={toggleTaskCompletion}
                                                completed
                                            />
                                        ))}
                                        {completedTasks.length === 0 && (
                                            <Typography sx={{ ml: 4, mt: 1 }}>No completed tasks.</Typography>
                                        )}
                                    </List>
                                </Collapse>
                            </Box>
                        </CardContent>
                    </Card>
                ) : (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                                        <TableCell>Task</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Priority</TableCell>
                                        <TableCell>Start date</TableCell>
                                        <TableCell>Due date</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedTasks.map((task) => (
                                        <TableRow key={task.id}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IconButton onClick={() => toggleTaskCompletion(task.id)} size="small" sx={{ mr: 1 }}>
                                                        {task.status ? <CheckBoxIcon color="success" /> : <CheckBoxOutlineBlankIcon />}
                                                    </IconButton>
                                                    <Typography>{task.name}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{task.description}</TableCell>
                                            <TableCell>
                                                <Button
                                                    sx={{
                                                        bgcolor: task.priority === 'High'
                                                            ? theme.palette.error.light
                                                            : task.priority === 'Medium'
                                                                ? theme.palette.warning.light
                                                                : theme.palette.info.light,
                                                        color: '#fff',
                                                        textTransform: 'none',
                                                        borderRadius: 1,
                                                        px: 1,
                                                        py: 0.5,
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {task.priority}
                                                </Button>
                                            </TableCell>
                                            <TableCell>{dayjs(task.start_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{dayjs(task.due_date).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell align="center">
                                                <Button size="small" onClick={() => handleEditClick(task)}>Update</Button>
                                                <Button size="small" color="error" onClick={() => handleConfirmDelete(task.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={tasks.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    </Paper>
                )}
            </Box>

            {/* Alerts */}
            <Snackbar open={Boolean(alert?.mssg)} autoHideDuration={3000} onClose={() => setAlert({})} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setAlert({})} severity={alert.type || 'info'} sx={{ width: '100%' }} variant="filled">
                    {alert.mssg}
                </Alert>
            </Snackbar>

            {/* Dialogs */}
            <AddTask open={showDialog} onClose={() => setShowDialog(false)} onCreate={handleCreateTask} selectedDate={null} />
            <UpdateTask open={showEditDialog} editTask={editingTask} onClose={() => setShowEditDialog(false)} onUpdate={handleUpdateTask} />

            {/* Confirm Delete Dialog */}
            <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, taskId: null })}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete({ open: false, taskId: null })}>Cancel</Button>
                    <Button onClick={handleDeleteTask} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Task
