import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ScheduleIcon from '@mui/icons-material/Schedule'
import BarChartIcon from '@mui/icons-material/BarChart'


const Home = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const images = [
    'https://images.prismic.io/smarttask/d1c1083c-db73-4562-917f-976f739d15ca_SmartTask-List-view.jpg?auto=compress,format',
    'https://s3.cloud.cmctelecom.vn/tinhte2/2020/04/4974019_cover_wunderlist.jpg',
    'https://images.ctfassets.net/rz1oowkt5gyp/7lpUSxVqNRggpqzCNcnfo1/04cf35d0a0ef60e18c6575eb9a0374e4/inbox-slider.png'
  ]

  const [currentImage, setCurrentImage] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={2} sx={{
        backgroundColor: '#2196F3',
      }}>
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

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Simplify Your Workflow with UETodoApp
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            The ultimate task management tool built for students and professionals alike.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ borderRadius: 8, px: 4, fontWeight: 'bold' }}
          >
            Get Started
          </Button>
        </motion.div>

        {/* Feature Images */}
        {/* Feature Carousel Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Box
            sx={{
              position: 'relative',
              mt: 6,
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }} >
            {images.map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`feature-${idx}`}
                style={{
                  position: idx === currentImage ? 'relative' : 'absolute',
                  opacity: idx === currentImage ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  width: '100%',
                  maxWidth: 800,
                  borderRadius: '16px',
                  boxShadow: theme.shadows[4],
                  margin: 'auto',
                  display: 'block',
                }}
              />

            ))}
          </Box>
          <Typography mt={6} variant="h5" fontWeight="bold" textAlign="center" color="text.secondary">
            {[
              "Easily track all your tasks in one place.",
              "Beautiful and intuitive list interface.",
              "Plan your schedule with integrated calendar view."
            ][currentImage]}
          </Typography>
        </motion.div>

      </Container>

      {/* Features Section */}
      <Container sx={{ mt: 10, mb: 10 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Why Choose UETodoApp?
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mt={4}>
          <FeatureCard
            icon={<CheckCircleOutlineIcon fontSize="large" color="primary" />}
            title="Organize Smarter"
            description="Categorize, prioritize, and plan with intuitive task groups and deadlines."
          />
          <FeatureCard
            icon={<TaskAltIcon fontSize="large" color="primary" />}
            title="Stay Focused"
            description="Focus mode and reminders keep your day productive and distraction-free."
          />

          <FeatureCard icon={<ScheduleIcon />} title="Plan Daily Tasks" description="Stay on top of what matters every day." />
          <FeatureCard icon={<BarChartIcon />} title="Track Progress" description="Visualize task completion in charts." />
        </Stack>
      </Container>
      <Box textAlign="center" py={4} bgcolor="#F5F5F5">
        <Typography variant="body2" color="text.secondary">
          © 2025 UETodoApp. Made with 💙 by RamseyTrinh.
        </Typography>
      </Box>

    </Box >
  )
}

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        flex: 1,
        p: 3,
        borderRadius: 3,
        textAlign: 'center',
        boxShadow: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Box mb={2}>{icon}</Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>

    </Box>
  )
}

export default Home
