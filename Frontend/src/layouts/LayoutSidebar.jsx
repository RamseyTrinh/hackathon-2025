import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    useMediaQuery,
    Divider,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentUserAction } from '@/stores/authAction.js'
import { logout } from '@/services/auth.js';
import { AccountCircle, Settings, Logout } from '@mui/icons-material'

const drawerWidth = 240;

const LayoutSidebar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setDesktopOpen(!desktopOpen);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Task', icon: <AssignmentIcon />, path: '/task' },
        { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    ];

    const handleGetCurrentUser = async () => {
        try {
            const userInfo = await dispatch(getCurrentUserAction())
            setCurrentUser(userInfo?.payload?.user || {})
        } catch (error) {
            console.error('Error fetching current user:', error)
        }
    }

    const handleLogout = async () => {

        try {
            await logout();
            console.log('Logout successful');
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setCurrentUser({});
            navigate('/');
        }
    };

    React.useEffect(() => {
        handleGetCurrentUser()
    }, [])

    React.useEffect(() => {
        console.log('Current User:', currentUser);
    }, [currentUser]);

    const drawerContent = (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 64,
                    px: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: theme.palette.text.primary,
                }}
            >
                Menu
            </Box>

            {/* Danh sách các mục */}
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            if (isMobile) {
                                setMobileOpen(false);
                            }
                        }}
                        selected={
                            location.pathname === item.path ||
                            location.pathname.startsWith(`${item.path}/`)
                        }
                    >
                        <ListItemIcon
                            sx={{
                                color:
                                    location.pathname === item.path ||
                                        location.pathname.startsWith(`${item.path}/`)
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: {
                        sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
                    },
                    ml: {
                        sm: desktopOpen ? `${drawerWidth}px` : 0,
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* UETodo App clickable logo/title */}
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: theme.palette.primary.contrastText,
                            mr: 2
                        }}
                    >
                        UETodo App
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Avatar and Menu */}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt={currentUser?.name || "User"}
                                src={currentUser?.avatar_url || "https://i.pravatar.cc/300"}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                            elevation: 4,
                            sx: {
                                mt: '45px',
                                borderRadius: 2,
                                minWidth: 180,
                                backgroundColor: theme => theme.palette.background.paper,
                                boxShadow: theme =>
                                    theme.palette.mode === 'light'
                                        ? '0 2px 12px rgba(0,0,0,0.1)'
                                        : '0 2px 12px rgba(255,255,255,0.1)',
                            },
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                navigate('/profile')
                                handleCloseUserMenu()
                            }}
                        >
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </MenuItem>

                        <MenuItem onClick={() => {
                            navigate('/setting')
                            handleCloseUserMenu()
                        }}
                        >
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem
                            onClick={() => {
                                handleLogout()
                                handleCloseUserMenu()
                            }}
                            sx={{
                                color: 'error.main',
                                '&:hover': {
                                    bgcolor: 'error.light',
                                    color: 'white',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'error.main' }}>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>

            </AppBar>

            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: desktopOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
                aria-label="sidebar"
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="persistent"
                    open={desktopOpen}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    width: '100%',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default LayoutSidebar;
