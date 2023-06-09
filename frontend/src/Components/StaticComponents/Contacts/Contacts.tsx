import { Box, Typography, Grid, Container } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));

const ContactInfo: React.FC = () => {
  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h5" align="center" sx={{
        marginBottom: 2,
        marginTop: '0',
        fontWeight: 'bold',
        color: 'primary.main'
      }}>
        Контактная информация
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Головной офис: ул. Суеркулова 8/1, Бизнес Центр «Vahtangard», Tower A, 2-этаж
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Офис продаж: 1-этаж
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Офис продаж «Globus»: ул. Токомбаева 53/1, гипермаркет «Globus»
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Офис продаж в ЖК "Вахталисские Поля": 7мкр 19
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ marginBottom: 1 }}>
            Юридический адрес: ул. Суеркулова 8/1
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Контакты офисов продаж:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          +996 312 56 04 69
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          +996 556 56 04 69
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          vahtangard.kg@gmail.com
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          info@vahtangard.kg
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Офис продаж:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Пн – Пт: с 8:30 до 18:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Суббота: с 9:00 до 13:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Воскресенье: выходной
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Офис продаж «Globus»:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Пн – Пт: с 9:30 до 19:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Суббота: с 10:30 до 16:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Воскресенье: выходной
        </Typography>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
          Офис продаж «Вахталисские Поля»:
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Пн – Пт: с 9:30 до 18:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Суббота: с 10:30 до 16:00
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Воскресенье: выходной
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default ContactInfo;
