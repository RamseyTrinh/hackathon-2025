import React from 'react';
import { getCurrentUserAction } from '@/stores/authAction.js';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateUser, changePassword } from '@/services/user.js';

const settingsMenu = ['Personal settings', 'Password settings'];

const ProfileSettings = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone_number: '',
    gender: '',
    dob: '',
    avatar_url: '',
  });

  const [passwordFormData, setPasswordFormData] = React.useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [userId, setUserId] = React.useState(null);
  const [showAvatarInput, setShowAvatarInput] = React.useState(false);

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertSeverity, setAlertSeverity] = React.useState('success');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState('Personal settings');

  const showAlert = (severity, message) => {
    setAlertOpen(false);
    setTimeout(() => {
      setAlertSeverity(severity);
      setAlertMessage(message);
      setAlertOpen(true);
    }, 100);
  };

  const handleGetCurrentUser = async () => {
    try {
      const response = await dispatch(getCurrentUserAction());
      const user = response?.payload?.user || {};
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        gender: user.gender || '',
        dob: user.dob || '',
        avatar_url: user.avatar_url || '',
      });
      setUserId(user.id || null);
    } catch (error) {
      console.error('Error fetching current user:', error);
      showAlert('error', 'Failed to fetch user data.');
    }
  };

  React.useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleReset = () => {
    handleGetCurrentUser();
  };

  const handleSubmit = async () => {
    const response = await updateUser(userId, formData);

    if (response?.status === 200) {
      handleGetCurrentUser();
      showAlert('success', 'User updated successfully!');
    } else {
      console.error('Error updating user:', response);
      showAlert('error', 'Failed to update user. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordFormData.old_password.trim() ||
      !passwordFormData.new_password.trim() ||
      !passwordFormData.confirm_password.trim()
    ) {
      showAlert('error', 'Please fill in all password fields.');
      return;
    }

    if (passwordFormData.new_password !== passwordFormData.confirm_password) {
      showAlert('error', 'New password and confirm password do not match.');
      return;
    }

    try {
      const response = await changePassword(userId, {
        old_password: passwordFormData.old_password,
        new_password: passwordFormData.new_password,
      });

      if (response?.status === 200) {
        showAlert('success', 'Password changed successfully!');
        setPasswordFormData({ old_password: '', new_password: '', confirm_password: '' });
      } else {
        showAlert('error', response?.data?.message || 'Failed to change password. Please try again.');
      }
    } catch (error) {
      console.error('Change password error:', error);
      showAlert('error', error?.response?.data?.message || 'Failed to change password. Please try again.');
    }
  };

  const handlePasswordReset = () => {
    setPasswordFormData({ old_password: '', new_password: '', confirm_password: '' });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Profile Settings
      </Typography>
      <Paper elevation={3} sx={{ mt: 2, display: 'flex', borderRadius: 2 }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, borderRight: '1px solid #eee', p: 2 }}>
          <List>
            {settingsMenu.map((item, index) => (
              <ListItem
                key={index}
                button
                selected={item === selectedTab}
                onClick={() => setSelectedTab(item)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: item === selectedTab ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Version: 1.3.38
            </Typography>
          </List>
        </Box>

        {selectedTab === 'Personal settings' && (
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography variant="h6" gutterBottom align="left">
              Personal settings
            </Typography>

            {/* Avatar */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              {formData.avatar_url ? (
                <Avatar
                  src={formData.avatar_url}
                  sx={{ width: 100, height: 100, mr: 2, cursor: 'pointer' }}
                  onClick={() => setShowAvatarInput(true)}
                />
              ) : (
                <Box
                  onClick={() => setShowAvatarInput(true)}
                  sx={{
                    width: 100,
                    height: 100,
                    border: '1px dashed #ccc',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 32,
                    color: '#888',
                    mr: 2,
                    cursor: 'pointer',
                  }}
                >
                  +
                </Box>
              )}

              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                Recommended size: 200x200
              </Typography>

              {showAvatarInput && (
                <TextField
                  label="Avatar URL"
                  size="small"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, avatar_url: e.target.value }))}
                  onBlur={() => setShowAvatarInput(false)}
                  placeholder="Paste avatar URL here"
                  sx={{ width: 300 }}
                  autoFocus
                />
              )}
            </Box>
            {/* Form */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Email" fullWidth disabled value={formData.email} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Please enter full name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  fullWidth
                  value={formData.phone_number}
                  onChange={handleChange('phone_number')}
                  placeholder="Please enter phone number"
                />
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <FormLabel
                  component="legend"
                  sx={{
                    minWidth: 80,
                    mr: 2,
                  }}
                >
                  Gender
                </FormLabel>
                <RadioGroup row value={formData.gender} onChange={handleChange('gender')} name="gender">
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Box>
              <Grid item xs={12}>
                <TextField
                  label="Date of Birth"
                  fullWidth
                  value={formData.dob}
                  onChange={handleChange('dob')}
                  placeholder="dd/mm/yyyy"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </Box>
        )}

        {selectedTab === 'Password settings' && (
          <Box sx={{ flex: 1, p: 3, minHeight: '500px' }} component="form" noValidate autoComplete="off">
            <Typography variant="h6" gutterBottom align="left" sx={{ mb: 3 }}>
              Password settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Old Password"
                  value={passwordFormData.old_password}
                  onChange={(e) => setPasswordFormData((prev) => ({ ...prev, old_password: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="New Password"
                  value={passwordFormData.new_password}
                  onChange={(e) => setPasswordFormData((prev) => ({ ...prev, new_password: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Confirm new password"
                  value={passwordFormData.confirm_password}
                  onChange={(e) => setPasswordFormData((prev) => ({ ...prev, confirm_password: e.target.value }))}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 20, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleChangePassword}>
                Change Password
              </Button>
              <Button variant="outlined" color="inherit" onClick={handlePasswordReset}>
                Reset
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileSettings;
