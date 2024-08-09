import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 
const ExpandMore = styled((props) => {
  const {  ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Tour() {
  const [expanded, setExpanded] = React.useState(null);

  const initialTourData=[
  {
    id: 1,
    city: "new york",
    img: "./img/newyork.jpeg",
    name: "new york bridge tour",
    info:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,repellendus!"
  },
  {
    id: 2,
    city: "paris",
    img: "./img/paris.jpeg",
    name: "paris lights tour",
    info:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,repellendus!"
  },
  {
    id: 3,
    city: "london",
    img: "./img/london.jpeg",
    name: "london royal palace tour",
    info:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,repellendus!"
  },
  {
    id: 4,
    city: "tokyo",
    img: "./img/tokyo.jpeg",
    name: "tokyo sushi tour",
    info:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel,repellendus!"
  }
];
  const handleExpandClick = (index) => {
    setExpanded(expanded=== index ? null : index);
  };
  const [tourData, setTourData] = React.useState(()=>{
    const savedData=localStorage.getItem('tourData');
    return savedData ? JSON.parse(savedData) : [];
  })

  const handleCloseClick = (id) => {
  const cardIndex = tourData.findIndex((card) => card.id === id);
  if (cardIndex !== -1) {
    const updatedTourData = [...tourData];
    const [removedCard] = updatedTourData.splice(cardIndex, 1);
    setTourData(updatedTourData);
    setAvailableCards([...availableCards, removedCard]);
  }
};

  const [availableCards, setAvailableCards] = React.useState(() => {
    const savedAvailableCards = localStorage.getItem('availableCards');
    return savedAvailableCards ? JSON.parse(savedAvailableCards) : initialTourData;
  });

  React.useEffect(() => {
    localStorage.setItem('tourData', JSON.stringify(tourData));
    localStorage.setItem('availableCards', JSON.stringify(availableCards));

  }, [tourData,availableCards]);

  const addCard = () => {
    if (availableCards.length === 0) {
      setAvailableCards(initialTourData);
      return;
    }
    const nextCard = availableCards[0];
    setTourData([...tourData, nextCard]);
    setAvailableCards(availableCards.slice(1));
  };

   

  return (
    <>
      <Grid
      container
      sx={{
        padding: 10,
        gap: 10,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(./img/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.5,
          zIndex: -1, 
        },
        minHeight: '100vh',
      }}
      // spacing={1}
    >

        {tourData.map((card,id)=>(
            <Grid item xs={12} sm={6} md={3} key={id}>
                    <Card sx={{ maxWidth: 230,maxHeight:500 ,background:'#EEEEEE'}}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={card.img}
                        alt={card.name}
                    >
                    </CardMedia>
                   
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {card.name}
                            <br/>
                            {card.city}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>

                      <IconButton
                        close={close==id}
                        onClick={() => handleCloseClick(card.id)}
                        aria-expanded={close==id}
                        sx={{color:'green',top:-230,right:-180}}
                      >
                        <CloseIcon/>
                      </IconButton>

                        <Typography variant="body2" color="text.secondary" 
                            sx={{ marginLeft: -4 }}>
                            Info
                        </Typography>
                        <ExpandMore
                        expand={expanded==id}
                        onClick={()=>handleExpandClick(id)}
                        aria-expanded={expanded==id}
                        label="show more"
                        sx={{marginLeft:19,color:'green'}}
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    
                    <Collapse in={expanded === id} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>Method:</Typography>
                    
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                        </CardContent>
                    </Collapse>
                    </Card>
                   
            </Grid>
        ))}
         
    </Grid>
    
    <Button className="btn"
        variant="contained"
        endIcon={<AddIcon />}
        onClick={addCard}
        sx={{
          position: 'absolute', left: 1200, top: 130, zIndex: 2, // Ensure button is above the background
        }}
      >
      Add
      </Button>
    </>
  );
}
