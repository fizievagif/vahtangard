import React, { FC, ReactElement } from 'react';
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import EmailIcon from '@mui/icons-material/Email';
import { Facebook, Instagram, WhatsApp, YouTube } from '@mui/icons-material';
import {Link} from "react-router-dom";

export const Footer: FC = (): ReactElement => {
  const socialLinks = {
    facebook: 'https://www.facebook.com/avangardstyle.kg',
    instagram: 'https://www.instagram.com/avangardstyle_kg',
    youtube: 'https://www.youtube.com/@AvangardStyleKGZ',
    whatsapp: 'https://wa.me/996556560469',
  };

  return (
    <footer className="footer">
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          backgroundColor: 'primary.main',
          paddingTop: '1rem',
          paddingBottom: '1rem',
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            color="primary.light"
          >
            <Grid item justifyContent="space-between">
              <Typography variant="h5" component="div">
                <Link
                  to="/"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    color: '#fff',
                  }}
                >
                  Vahtangard
                  <Box
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '10px',
                      background: 'transparent',
                    }}
                  >
                  </Box>
                </Link>
              </Typography>
              <Typography color="primary.light" variant="subtitle1">
                {`© Все права защищены, ${new Date().getFullYear()}`}
              </Typography>
            </Grid>

            <Grid item>
              <List>
                <ListItem sx={{ m: 0, p: 0, pb: 1 }}>
                  <Link to="/apartments">
                    <Typography>Аппартаменты</Typography>
                  </Link>
                </ListItem>
                <ListItem sx={{ m: 0, p: 0, pb: 1 }}>
                  <Link to="/categories">
                    <Typography>Категории</Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
            <Grid item>
              <List>
                <ListItem style={{ display: 'inline', paddingLeft: 0 }}>
                  <Link to={socialLinks.facebook}>
                    <Facebook />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link to={socialLinks.whatsapp}>
                    <WhatsApp />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link to={socialLinks.instagram}>
                    <Instagram />
                  </Link>
                </ListItem>
                <ListItem style={{ display: 'inline' }}>
                  <Link to={socialLinks.youtube}>
                    <YouTube />
                  </Link>
                </ListItem>
              </List>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '0px' }}
                  color="primary.light"
                >
                  <EmailIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  vahtangard.kg@gmail.com
                </Typography>
              </Typography>
              <Typography
                component="p"
                style={{ position: 'relative', paddingBottom: '5px' }}
              >
                <Typography
                  component="span"
                  style={{ position: 'absolute', top: '0px' }}
                  color="primary.light"
                >
                  <PhonelinkRingIcon />
                </Typography>
                <Typography component="span" sx={{ pl: 4 }}>
                  +996 556 56 04 69
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="p">
                Internet Vahtangard LLC
              </Typography>
              <Typography component="p">
                Vahtangard 2023
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
