import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { deleteUser } from '@/services/user.js';
import { getCurrentUserAction } from '@/stores/authAction.js';
import { useDispatch } from 'react-redux';

const settingsMenu = ['Appearance', 'Language', 'Danger Zone'];

const Setting = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('Appearance');
  const [user, setUser] = React.useState(null);

  const handleGetCurrentUser = async () => {
    try {
      const response = await dispatch(getCurrentUserAction());
      const user = response?.payload?.user || {};
      setUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(user?.id);
      if (response?.status === 200) {
        console.log('User deleted successfully');
        // TODO: redirect hoặc logout
      } else {
        console.error('Failed to delete user:', response);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setConfirmOpen(false);
    }
  };

  React.useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <Box sx={{ mx: 'auto' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {t('Settings')}
      </Typography>

      <Paper elevation={3} sx={{ mt: 2, display: 'flex', borderRadius: 2 }}>
        {/* Sidebar */}
        <Box sx={{ width: 240, borderRight: '1px solid #eee', p: 2 }}>
          <List>
            {settingsMenu.map((item) => (
              <ListItem
                key={item}
                button
                selected={item === selectedTab}
                onClick={() => setSelectedTab(item)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: item === selectedTab ? '#f0f0f0' : 'transparent',
                }}
              >
                <ListItemText primary={t(item)} />
              </ListItem>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Version: 1.3.38
            </Typography>
          </List>
        </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {(selectedTab === 'Appearance' || selectedTab === 'Language') && (
            <Paper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                {t(selectedTab)}
              </Typography>
              <Typography color="text.secondary">
                {t('This feature is under development.')}
              </Typography>
            </Paper>
          )}

          {selectedTab === 'Danger Zone' && (
            <Paper elevation={0} sx={{ p: 3 }}>
              <Typography variant="h6" color="error" gutterBottom>
                {t('Danger Zone')}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => setConfirmOpen(true)}
              >
                {t('Delete Account')}
              </Button>
            </Paper>
          )}
        </Box>
      </Paper>

      {/* Dialog xác nhận xóa tài khoản */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{t('Confirm Deletion')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Are you sure you want to delete your account? This action cannot be undone.')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>{t('Cancel')}</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Setting;
