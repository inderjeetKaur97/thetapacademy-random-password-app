import React, { useCallback, useEffect, useState } from 'react';
import './style.css';
import Box from '@mui/material/Box';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Snackbar,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';
import GeneratePassword from './utils/RandomPassword';
import { STYLES } from './utils/constants';

function App() {
  const initCustomePassword = {
    uppercase: false,
    lowercase: false,
    numeric: false,
    symbol: false,
  };

  const [customPassword, setcustomPassword] = useState(initCustomePassword);
  const [customLength, setcustomLength] = useState(5);
  const [genPassword, setgenPassword] = useState('');
  const [textBoxLabel, settextBoxLabel] = useState('------your password will display here------');
  const [openCopied, setopenCopied] = useState(false);
  const [lastFivePasswords, setlastFivePasswords] = useState([]);

  const handleCopyPassword = useCallback((text) => {
    navigator.clipboard.writeText(text);
    setopenCopied(true);
  });
  const handleCustomPassword = useCallback((e) => {
    const { name } = e.target;
    setcustomPassword({ ...customPassword, [name]: !customPassword[name] });
  });
  const handleGenerate = useCallback(() => {
    if (Object.values(customPassword).some((val) => val !== false)) {
      const password = GeneratePassword(customLength, customPassword);
      setgenPassword(password);
      settextBoxLabel(null);
    }
  });

  useEffect(() => {
    if (genPassword.length) {
      const prevPasswords = JSON.parse(localStorage.getItem('passwords'));
      if (prevPasswords) {
        if (prevPasswords.length > 5) { prevPasswords.pop(); }
        setlastFivePasswords(prevPasswords);
      }
      const passwords = [genPassword, ...prevPasswords];
      localStorage.setItem('passwords', JSON.stringify(passwords));
    }
  }, [genPassword]);
  useEffect(() => {
    const prevPasswords = JSON.parse(localStorage.getItem('passwords'));
    if (prevPasswords) {
      if (prevPasswords.length > 5) { prevPasswords.pop(); }
      setlastFivePasswords(prevPasswords);
    } else { localStorage.setItem('passwords', JSON.stringify([])); }
  }, []);

  return (
    <div className="main global-font">
      <Snackbar
        open={openCopied}
        onClose={() => setopenCopied(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '93vh' }}>
        <Box
          sx={{
            mt: 3,
            p: 1,
            boxShadow: 3,
            borderRadius: 2,
          }}
          className="main-container"
        >
          <Container>
            <Container>
              <Typography variant="h5" component="h5" sx={{ my: 2 }} className="global-font main-heading">
                <ArrowForwardIosIcon />
                Generate a Secure Password
              </Typography>
              <Box
                sx={{
                  minWidth: '50vw', px: 2, py: 1, border: '1px solid #79797b', display: 'flex', justifyContent: 'space-between',
                }}
                disabled="true"
              >
                <Typography variant="h5" component="h5" sx={{ overflow: 'hidden', mr: 2, fontSize: '1rem' }} className="global-font">
                  <span>
                    {textBoxLabel}
                    {genPassword}
                  </span>
                </Typography>
                <ContentCopyIcon sx={{ cursor: 'pointer' }} onClick={() => handleCopyPassword(genPassword)} />
              </Box>
              <Divider sx={{ borderStyle: 'dashed', my: 3, border: '1px dashed #79797b' }} className="divider" />
            </Container>
            <Container
              style={{ border: '1px solid #79797b' }}
              sx={{
                height: '55%',
                maxHeight: '60vh',
                minHeight: '10vh',
                width: '52vw',
              }}
              className="sub-container"
            >
              <Box>
                <Typography variant="h5" component="h5" className="global-font sub-heading" sx={{ mt: 1, fontSize: '18px', fontWeight: '600' }}>
                  Customize your password
                </Typography>
              </Box>
              <Container
                sx={{
                  display: 'flex', justifyContent: 'space-between',
                }}
                style={{ padding: 0 }}
              >
                <Container
                  sx={{
                    p: 0,
                    display: 'flex',
                    maxWidth: '70%',
                    width: '70%',
                    mb: 2,
                    height: '55%',
                    maxHeight: '50vh',
                    minHeight: '10vh',
                  }}
                  justifyContent="space-between"
                >
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={customPassword.uppercase}
                            onChange={handleCustomPassword}
                            name="uppercase"
                            color="secondary"
                            sx={{ color: STYLES.checkboxBorder }}
                          />
                          )}
                        label="Uppercase"
                        sx={{ fontFamily: 'Inconsolata' }}
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            color="secondary"
                            checked={customPassword.lowercase}
                            onChange={handleCustomPassword}
                            sx={{ color: STYLES.checkboxBorder }}
                            name="lowercase"
                          />
                          )}
                        label="Lowercase"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            color="secondary"
                            checked={customPassword.numeric}
                            onChange={handleCustomPassword}
                            sx={{ color: STYLES.checkboxBorder }}
                            name="numeric"
                          />
                          )}
                        label="Numeric"
                      />
                      <FormControlLabel
                        control={(
                          <Checkbox
                            color="secondary"
                            checked={customPassword.symbol}
                            onChange={handleCustomPassword}
                            sx={{ color: STYLES.checkboxBorder }}
                            name="symbol"
                          />
                          )}
                        label="Special Character"
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl
                    required
                    component="fieldset"
                    sx={{ my: 3 }}
                    variant="standard"
                  >
                    <FormGroup>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mt: 1 }}>
                          Password Length :
                        </Typography>
                        <input
                          style={{
                            fontSize: '1rem',
                            backgroundColor: '#79797b',
                            width: '45px',
                            height: '45px',
                            color: 'white',
                          }}
                          value={customLength}
                          onChange={(e) => setcustomLength(e.target.value)}
                          type="number"
                          name="length"
                          min="0"
                        />
                      </Box>
                    </FormGroup>
                  </FormControl>
                </Container>
                <Container
                  sx={{
                    mb: 2,
                    width: '30%',
                    maxWidth: '40%',
                    minWidth: '35%',
                    overflow: 'hidden',
                  }}
                >
                  <Typography component="h5" sx={{ m: 1 }}>Previous Passwords</Typography>
                  <ul>
                    {lastFivePasswords.map((password) => {
                      if (password.length) {
                        return <li style={{ color: STYLES.checkboxBorder }}><span style={{ color: 'white' }}>{password}</span></li>;
                      }
                      return null;
                    })}
                  </ul>
                </Container>
              </Container>
            </Container>
            <Button
              variant="contained"
              sx={{ mx: 3, my: 2 }}
              className="global-font"
              onClick={handleGenerate}
              style={{
                backgroundColor: '#9323fa', fontSize: '1rem', fontWeight: 600, width: '15vw', letterSpacing: '2px',
              }}
            >
              Generate
            </Button>
          </Container>
        </Box>
      </Grid>
      <Typography component="h5" align="center">
        {' '}
        &#9829;
        Made by Inderjeet Kaur
      </Typography>
    </div>
  );
}

export default App;
