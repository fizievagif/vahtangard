import theme from "./theme";

export const borderRadius = '35px';

export const boxShadow = '10px 10px 37px #e9e9e9, -10px -10px 37px #ffffff';
export const blockPadding = '30px';

export const blockStyle = {
  margin: '10px',
  borderRadius,
  boxShadow,
  padding: 0,
};

export const blockTopStyle = {
  color: theme.palette.info.dark,
  paddingTop: '10px',
  paddingBottom: '10px',
  borderTopLeftRadius: '35px',
  borderTopRightRadius: '35px',
};
export const stylesGlobal = {
  title: {
    fontWeight: 600,
    textTransform: 'uppercase',
    lineHeight: '1.6',
  },
  fontSize: {
    xs: '20px',
    lg: '30px',
  },
  maxWidth: {
    xs: '100%',
    lg: '75%',
  },
};

export const cardStyle = {
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  cardBody: {
    borderRadius,
    margin: '20px',
  },
  height: {
    xs: '100px',
    md: '200px',
    lg: '300px',
  },
  width: {
    xs: '300px',
    sm: '400px',
    md: '600px',
    lg: '800px',
  },
  innerStyle: {
    display: 'flex',
  },
  fontSize: {
    xs: '12px',
    sm: '18px',
    md: '26px',
  },
};
export const fullCardStyle = {
  card: {
    cursor: 'pointer',
  },
  cardBody: {
    borderRadius,
    margin: '20px',
  },
  padding: { sm: '20px', md: '40px' },
  innerStyle: {
    display: 'flex',
  },
  width: '100%',
  height: '100%',
  fontSize: {
    xs: '20px',
    sm: '26px',
    md: '50px',
  },
};