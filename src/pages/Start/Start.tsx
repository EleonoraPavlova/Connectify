import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export const Start = () => {

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        sx={{ height: 160 }}
        image="https://media.istockphoto.com/id/905101900/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D1%80%D0%BE%D0%BF%D1%96%D1%87%D0%BD%D1%96-%D0%B4%D0%B6%D1%83%D0%BD%D0%B3%D0%BB%D1%96.jpg?s=612x612&w=0&k=20&c=xOYOqdlVwZ0Q22Agw0GCtlADXd6u8SSwommUXan4j_w="
        title="banner"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Hi my friend!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          You need to log in to use your account
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button size="small" color="success">Sign in</Button>
      </CardActions>
    </Card>
  );
}