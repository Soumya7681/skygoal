import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress, Alert, Grid } from '@mui/material';
import Logo from './../assets/image/sr.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
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
          <Typography variant="h4" color="black" textAlign="center" sx={{ mt: 1 }}>
            Welcome To My Test!
          </Typography>
        </Box>
      </Grid>

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
          <Typography variant="h4" textAlign="center" component="h2" gutterBottom>
            Login to Your Account 
          </Typography>

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
            {status === 'loading' ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Typography textAlign="center" sx={{ mt: 2 }}>
            Don't have an account?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
