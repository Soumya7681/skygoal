import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, logoutUser } from '../store/slices/authSlice'; // Update the path accordingly
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(userDetails(token));
    }
  }, [dispatch, token]);

  // Handle logout
  const handleLogout = async() => {
    const result = await dispatch(logoutUser(token));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login'); // Navigate to login page after successful signup
    }
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ mt: 2 }}>
        {status === 'loading' && <Typography variant="body1">Loading user details...</Typography>}
        {error && <Typography variant="body1" color="error">{error}</Typography>}
        {status === 'succeeded' && (
          <>
            <Typography variant="h6" component="h2">
              Welcome, {user?.username}!
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              Email: {user?.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleLogout} // Call handleLogout on click
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
