import React from 'react'
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
  AppBar,
  Toolbar,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Product = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box >
      {/* Header */}
      <AppBar position="static" color="default" elevation={2} sx={{
        backgroundColor: '#2196F3', mb: 4,
      }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            UETodoApp
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              onClick={() => navigate('/product')}
              sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText, cursor: 'pointer' }}
            >
              Product
            </Button>
            <Button
              color="primary"
              onClick={() => navigate('/about')}
              sx={{ fontWeight: 'bold', color: theme.palette.primary.contrastText, cursor: 'pointer' }}
            >
              About Us
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ backgroundColor: '#80D8C3', fontWeight: 'bold', borderRadius: 8, px: 3, color: '#333446', '&:hover': { backgroundColor: '#64B5F6' } }}
            >
              Get started
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 6 }}>
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
          Explore UETodoApp
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={6} maxWidth={800} mx="auto">
          UETodoApp is your intelligent task manager. Designed with a modern UI and real productivity needs in mind, it helps you organize, plan, and get more done every day.
        </Typography>
      </motion.div>

      {/* Section: Dashboard */}
      <Grid container spacing={6} alignItems="center" mb={6}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/dashboard.jpg"
                alt="Dashboard Screenshot"
                sx={{ height: 310, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Dashboard overview with all task statistics and charts
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Smart Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Visualize all your tasks with status-based breakdowns. The dashboard summarizes completed tasks, tasks in progress, and upcoming ones using dynamic charts—giving you insight into your productivity at a glance.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Section: Task View */}
      <Grid container spacing={6} alignItems="center" mb={6}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Intuitive Task View
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Easily create, edit, and view tasks in a beautifully designed interface. With a clean layout, clear labels, and interactive elements, you’ll never miss a deadline or forget a task.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/taskview.jpg"
                alt="Task View Screenshot"
                sx={{ height: 310, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Detailed task view with edit, delete, and priority features
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Section: Calendar */}
      <Grid container spacing={6} alignItems="center" mb={8}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/calendar.jpg"
                alt="Calendar View Screenshot"
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Calendar integration with drag-and-drop task scheduling
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Calendar Integration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Plan your schedule with a powerful calendar view. Drag and drop tasks into different days, view deadlines clearly, and stay in control of your time.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Ready to boost your productivity?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Get started with UETodoApp and achieve more every day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none', px: 5, py: 1.5, mb: 3 }}
          >
            Get Started Now
          </Button>
        </Box>
      </motion.div>
      </Box>
    </Box>
  )
}

export default Product
