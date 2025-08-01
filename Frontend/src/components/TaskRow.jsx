import React from 'react'
import {
    Box,
    IconButton,
    ListItem,
    Typography,
    Button,
    useTheme,
} from '@mui/material'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'


const TaskRow = ({ task, onToggleStatus, completed, onEdit, onDeleteTask }) => {
    const theme = useTheme()

    return (
        <>
            <ListItem
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderBottom: '1px solid #eee',
                }}
            >
                <Box
                    sx={{
                        flexBasis: '30%',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={() => onToggleStatus(task.id)}
                        size="small"
                        sx={{ mr: 1 }}
                    >
                        {task.status ? (
                            <CheckBoxIcon color="success" />
                        ) : (
                            <CheckBoxOutlineBlankIcon />
                        )}
                    </IconButton>
                    <Typography>{task.name}</Typography>
                </Box>
                <Box sx={{ flexBasis: '35%' }}>{task.description}</Box>
                <Box sx={{ flexBasis: '15%', flexShrink: 0 }}>
                    <Button
                        size="small"
                        sx={{
                            bgcolor:
                                task.priority === 'High'
                                    ? theme.palette.error.light
                                    : task.priority === 'Medium'
                                        ? theme.palette.warning.light
                                        : theme.palette.info.light,
                            color:
                                task.priority === 'High'
                                    ? theme.palette.error.contrastText
                                    : task.priority === 'Medium'
                                        ? theme.palette.warning.contrastText
                                        : theme.palette.info.contrastText,
                            textTransform: 'none',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                            fontSize: '0.75rem',
                        }}
                    >
                        {task.priority}
                    </Button>
                </Box>
                <Box sx={{ flexBasis: '15%' }}>
                    {dayjs(task.start_date).format('DD/MM/YYYY')}
                </Box>
                <Box sx={{ flexBasis: '10%' }}>
                    <Typography>
                        {dayjs(task.due_date).format('DD/MM/YYYY')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        flexBasis: '10%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    {!completed && (
                        <>
                            <IconButton onClick={() => onEdit(task)}><EditIcon /></IconButton>
                            <IconButton color="error" onClick={onDeleteTask}>
                                <DeleteIcon />
                            </IconButton>

                        </>
                    )}
                </Box>
            </ListItem>
        </>
    )
}

export default TaskRow
