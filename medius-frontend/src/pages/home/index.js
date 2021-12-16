import { Container, Grid } from '@material-ui/core';
import './style.scss';
import NavBar from '../../components/home/NavBar'
import Footer from '../../components/home/Footer';
import MediumPosts from '../../components/home/PostPreview'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import React, { useEffect } from 'react';
import { getPosts } from '../../api/posts';

function Home({ isLoggingIn }) {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    getPosts(null, [], true, 0, 10).then(posts => {
      setPosts(posts);
    })
  }, []);

  return (
    <div>
      <NavBar isLoggingIn={isLoggingIn || false} />
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
              <img
                id="illus"
                src="Illustrations-Dimensional.png"
                alt="" />
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className="Trending">
        <Container>
          <h2><span><TrendingUpIcon /></span>Trending on Medius</h2>
          {posts.map(post => (
            <MediumPosts
              key={post.post_id}
              post={post.post_id}
              author={post.author}
              title={post.title}
              contentPreview={post.contentPreview}
              postTime={post.published_at}
              previewImagePath={post.preview_image_path}
              mustLoginFirst={true}
            />
          ))}
        </Container>
      </div>
      <Footer />
    </div>

  );
}

export default Home;