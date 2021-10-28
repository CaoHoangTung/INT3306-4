import { Button, Container, Grid } from '@material-ui/core';
import './App.scss';
import NavBar from './components/NavBar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App_MainSection">
        <Container>
          <Grid container justify="center" alignItems="center">
            <Grid item lg={6}>
              <h1>Where good idea find you</h1>
              <p>
                Read and share new perspective on just about any topic.
                Everyone's welcome.
              </p>
              <Button>Get started</Button>
            </Grid>
            <Grid item lg={6}>
              <img src="https://cdn-static-1.medium.com/sites/medium.com/creators/images/Illustrations-Dimensional-1.png" alt="" />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className="Trending">
        <Container>
          <h2><span><TrendingUpIcon/></span>Trending on Medius</h2>
        </Container>
      </div>
    </div>
  );
}

export default App;
