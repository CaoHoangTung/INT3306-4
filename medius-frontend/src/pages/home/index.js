import {Container, Grid } from '@material-ui/core';
import './style.scss';
import NavBar from '../../components/home/NavBar'
import Footer from '../../components/home/Footer';
import MediumPosts from '../../components/home/PostPreview'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {
  
  return (
    <div>
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
              
            </Grid>
            <Grid item lg={6}>
              <img src="Illustrations-Dimensional.png" alt="" />
            </Grid>
          </Grid>
        </Container>
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
    </div>

  );
}

export default Home;