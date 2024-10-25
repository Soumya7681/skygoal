import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Grid } from '@mui/material';
import Logo from './../assets/image/sr.png';

const SignupPage = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser({ username, email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login'); // Navigate to login page after successful signup
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left side for company logo */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          color: 'white',
        }}
      >
        <Box>
          <img
            src={Logo}
            alt="Company Logo"
            style={{ width: '100%' }}
          />
          <Typography variant="h4" color='black' textAlign={'center'} sx={{ mt: 1 }}>
            Welcome To My Test!
          </Typography>
        </Box>
      </Grid>

      {/* Right side for the signup form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
          backgroundColor: '#f4f6f8',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            width: '100%',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" textAlign={'center'} component="h2" gutterBottom>
            Sign Up
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          {status === 'loading' && (
            <Box sx={{ mt: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
