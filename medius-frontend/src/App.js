import { Button, Container, Grid } from '@material-ui/core';
import './App.scss';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import MediumPosts from './components/PostPreview'
import Post from './components/Post'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import React, { useState } from 'react';
import LoginModal from './components/LoginModal'
import Topic from "./components/Topic";
import PostInProfile from "./components/PostInProfile";
import PostPreview from "./components/PostPreview";
import UserIntro from './components/UserIntro';
function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <NavBar />
      <div className="App_MainSection">
        <Container>
          <Grid container justify="center" alignItems="center">
            <Grid item lg={6}>
              <h1>Where good ideas find you</h1>
              <p>
                Read and share new perspective on just about any topic.
                Everyone's welcome.
              </p>
              <Button onClick={() => setShow(true)}>Get started</Button>
            </Grid>
            <Grid item lg={6}>
              <img src="Illustrations-Dimensional.png" alt="" />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div>
        <LoginModal onClose={()=>setShow(false)} show={show}/>
      </div>
      <div className="Trending">
        <Container>
          <h2><span><TrendingUpIcon /></span>Trending on Medius</h2>
          <MediumPosts
            author="author"
            topic="topic"
            title="title"
            contentPreview="contentPreview"
            postTime="2:00:00 PM 10/29/2021"
          />
          <MediumPosts
            author="author"
            topic="topic"
            title="title"
            contentPreview="contentPreview"
            postTime="2:00:00 PM 10/29/2021"
          />
          <MediumPosts
            author="author"
            topic="topic"
            title="title"
            contentPreview="contentPreview"
            postTime="2:00:00 PM 10/29/2021"
          />
          <MediumPosts
            author="author"
            topic="topic"
            title="title"
            contentPreview="contentPreview"
            postTime="2:00:00 PM 10/29/2021"
          />
        </Container>
      </div>
      <Footer />
      <UserIntro
        author = "user"
        image = "logo512.png"
        description = "Hello World! Hello World! Hello World! Hello World! Hello World!"
      />
    </div>

  );
}

export default App;
