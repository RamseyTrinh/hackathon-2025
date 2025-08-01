import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddTask from '../../components/AddTask'
import {
  Box,
  Paper,
  useTheme,
  Alert,
  Snackbar,
  useMediaQuery,
  Typography,
} from '@mui/material'

import { createTask, getTasksByUserId } from '@/services/task'
import { getCurrentUserAction } from '@/stores/authAction.js'
import { useDispatch } from 'react-redux'

const Calendar = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [events, setEvents] = useState([])
  const [alert, setAlert] = useState({})
  const [currentUser, setCurrentUser] = useState({})

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr)
    setModalOpen(true)
  }

  const handleCreateTask = async (task) => {
    try {
      const response = await createTask(task)
      if (response?.success) {
        setAlert({ mssg: 'Task created successfully!', type: 'success' })
        setModalOpen(false)
        handleListTask()
      }
    } catch (error) {
      setAlert({ mssg: 'Failed to process task.', type: 'error' })
      console.error('Error saving task:', error)
    }
  }

  const handleListTask = async () => {
    try {
      const userId = currentUser?.id
      const response = await getTasksByUserId(userId, 1, 1000)
      const tasksData = response?.data || []

      const calendarEvents = tasksData.map((task) => ({
        id: task.id,
        title: task.status === true ? `[Completed] ${task.name}` : task.name,
        date: task.start_date,
      }))

      setEvents(calendarEvents)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const handleGetCurrentUser = async () => {
    try {
      const userInfo = await dispatch(getCurrentUserAction())
      setCurrentUser(userInfo?.payload?.user || {})
    } catch (error) {
      console.error('Error fetching current user:', error)
    }
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [])

  useEffect(() => {
    if (currentUser?.id) {
      handleListTask()
    }
  }, [currentUser?.id])

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 2 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
        Calendar
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 1, sm: 2 },
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: 2,
          width: '100%',
          overflowX: 'auto',
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={events}
          height="auto"
          contentHeight="auto"
          aspectRatio={isMobile ? 0.75 : 1.5}
          windowResize={true}
          handleWindowResize={true}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          dayMaxEvents={5}
          fixedWeekCount={false}
          dayCellClassNames={({ date }) => {
            const classes = ['fc-daycell']
            const day = date.getDay()
            if (day === 0) classes.push('fc-sunday')
            if (day === 6) classes.push('fc-saturday')
            return classes
          }}
          dayCellContent={({ date }) => {
            const isToday = date.toDateString() === new Date().toDateString()
            const day = date.getDay()
            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingRight: 4,
                }}
              >
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    padding: isToday ? '2px 6px' : 0,
                    borderRadius: isToday ? '50%' : 0,
                    backgroundColor: isToday
                      ? theme.palette.success.dark
                      : 'transparent',
                    color: isToday
                      ? theme.palette.success.contrastText
                      : day === 0
                        ? theme.palette.error.main
                        : day === 6
                          ? theme.palette.success.main
                          : theme.palette.text.primary,
                  }}
                >
                  {date.getDate()}
                </span>
              </div>
            )
          }}
          eventContent={({ event }) => {
            const title = event.title
            const isCompleted = title.includes('[Completed]')
            return (
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  backgroundColor: isCompleted
                    ? 'transparent'
                    : theme.palette.primary.dark,
                  color: isCompleted
                    ? theme.palette.success.main
                    : theme.palette.primary.contrastText,
                  borderRadius: 6,
                  padding: '2px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 4,
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                }}
              >
                {isCompleted && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.success.main,
                      display: 'inline-block',
                    }}
                  />
                )}
                <span>{title}</span>
              </div>
            )
          }}
          eventClassNames={() => ['event-custom']}
        />

        <AddTask
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreateTask}
          selectedDate={selectedDate}
        />

        <style>
          {`
            .fc {
              font-family: ${theme.typography.fontFamily};
              color: ${theme.palette.text.primary};
            }

            .fc .fc-toolbar {
              background-color: ${theme.palette.background.paper};
              border-radius: ${theme.shape?.borderRadius || 8}px;
              padding: ${theme.spacing(1.5)};
              margin-bottom: ${theme.spacing(2)};
              flex-wrap: wrap;
              gap: 8px;
            }

            .fc .fc-button {
              background-color: ${theme.palette.background.paper};
              color: ${theme.palette.text.primary};
              border: 1px solid ${theme.palette.divider};
              box-shadow: none;
              text-transform: none;
              padding: 4px 8px;
              font-size: 0.875rem;
            }

            .fc .fc-button:hover {
              background-color: ${theme.palette.action.hover};
              border-color: ${theme.palette.action.hover};
            }

            .fc .fc-button.fc-button-active,
            .fc .fc-button.fc-today-button {
              background-color: ${theme.palette.primary.main} !important;
              color: ${theme.palette.primary.contrastText} !important;
              border-color: ${theme.palette.primary.main} !important;
              box-shadow: none !important;
            }

            .fc .fc-button.fc-today-button:hover {
              background-color: ${theme.palette.primary.dark} !important;
              border-color: ${theme.palette.primary.dark} !important;
            }

            .fc-theme-standard .fc-scrollgrid,
            .fc-theme-standard td,
            .fc-theme-standard th {
              border-color: ${theme.palette.divider};
            }

            .fc-col-header-cell {
              background-color: ${theme.palette.background.paper};
              color: ${theme.palette.text.secondary};
            }

            .fc-daygrid-day {
              background-color: ${theme.palette.background.default};
            }

            .fc-daygrid-day.fc-day-today {
              background-color: transparent !important;
            }

            .fc-daygrid-day.fc-day-other .fc-daygrid-day-number {
              color: ${theme.palette.text.disabled};
            }

            .fc-sunday .fc-daygrid-day-number {
              color: ${theme.palette.error.main} !important;
            }

            .fc-saturday .fc-daygrid-day-number {
              color: ${theme.palette.success.main} !important;
            }

            .event-custom {
              padding: 0 !important;
              background-color: transparent !important;
              border: none !important;
              cursor: pointer;
            }

            .fc-daygrid-day:hover {
              background-color: ${theme.palette.action.hover};
              cursor: pointer;
            }

            .fc .fc-col-header-cell-cushion {
              color: ${theme.palette.text.primary} !important;
            }
          `}
        </style>
      </Paper>

      <Snackbar
        open={Boolean(alert?.mssg)}
        autoHideDuration={3000}
        onClose={() => setAlert({})}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setAlert({})}
          severity={alert.type || 'info'}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {alert.mssg}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Calendar
