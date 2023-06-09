import React from 'react';
import { Box, Typography, Container, styled } from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
}));

const AboutUs: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '40px 0' }}>
      <StyledContainer maxWidth="md">
        <Typography variant="h4" align="center" sx={{ marginBottom: 4 }}>
          О компании Vahtangard
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Vahtangard – ведущая строительная компания, специализирующаяся на проектировании и строительстве жилых и коммерческих объектов высокого качества. Мы предлагаем полный цикл строительных услуг, начиная от разработки проекта и заканчивая сдачей готовых объектов.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Наша команда состоит из опытных специалистов с обширным опытом работы в строительной отрасли. Мы заботимся о каждом аспекте проекта, начиная от архитектурного дизайна и выбора качественных материалов до строгое соблюдение сроков и контроля качества.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Мы гордимся своими репутацией и успехами, достигнутыми благодаря высоким стандартам качества и превосходному обслуживанию клиентов. Мы стремимся к постоянному совершенствованию и инновациям в нашей работе.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          В нашей компании мы придерживаемся принципов прозрачности, надежности и взаимовыгодного сотрудничества. Мы ценим доверие наших клиентов и всегда стремимся превзойти их ожидания.
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Наша миссия - создавать инновационные и качественные строительные решения, которые вносят вклад в развитие городской инфраструктуры и улучшают качество жизни людей. Мы гордимся каждым завершенным проектом и рады помогать нашим клиентам воплощать их мечты.
        </Typography>
      </StyledContainer>
    </Box>
  );
};

export default AboutUs;