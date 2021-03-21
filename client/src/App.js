import { useState, useEffect } from 'react';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

import useStyles from './styles';

function App() {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get('/posts')
      .then(response => {
        const data = response.data;
        setPosts(data);
      })
      .catch(error => alert('Error retrieving data'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setTitleError(false);
    setMessageError(false);

    if (title === '') {
      setTitleError(true);
    }
    if (message === '') {
      setMessageError(true);
    }

    if (title && message) {
      setTitle('');
      setMessage('');
      axios
        .post('/posts/create', { title, message })
        .then(() => fetchData())
        .catch(error => alert('Error sending data'));
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6">Posts</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm">
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={e => setTitle(e.target.value)}
                value={title}
                className={classes.field}
                label="Post Title"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={titleError}
              />
              <TextField
                onChange={e => setMessage(e.target.value)}
                value={message}
                className={classes.field}
                label="Post message"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                error={messageError}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {posts.map(post => (
              <Grid item key={post} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="image"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      {post.title}
                    </Typography>
                    <Typography>{post.message}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Posts
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Deploy a MERN Stack App to Heroku
        </Typography>
      </footer>
    </>
  );
}

export default App;
