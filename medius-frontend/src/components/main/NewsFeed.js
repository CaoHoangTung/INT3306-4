import MediumPosts from "../home/PostPreview.js";
import React from 'react';
import '../../pages/main/Main.scss'
import { getPosts } from "../../api/posts.js";
import InfiniteScroll from "react-infinite-scroll-component";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user_id: this.props.user_id,
            topic_ids: this.props.topic_ids,
            sort_by_upvotes: this.props.sort_by_upvotes,
            page: 0,
            limit: this.props.limit,
            has_more: true,
        };
    }

    componentDidMount() {
        this.fetchMoreData();
    }

    fetchMoreData = async () => {
        var { _, user_id, topic_ids, sort_by_upvotes, page, limit } = this.state;
        await getPosts(
            user_id, topic_ids, sort_by_upvotes, page, limit
        ).then(newPosts => {
            this.setState({
                posts: this.state.posts.concat(newPosts),
                page: this.state.page + 1,
            });
            if (newPosts.length === 0) {
                this.setState({
                    has_more: false,
                });
            }
        })
    }

    render() {
        return (
            <InfiniteScroll
                dataLength={this.state.posts.length}
                next={this.fetchMoreData}
                hasMore={this.state.has_more}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <div className="newsFeed">
                    {this.state.posts.map((post, index) => (
                        <MediumPosts
                            key={post.post_id}
                            postId={post.post_id}
                            author={post?.user_detail?.first_name + " " + post?.user_detail?.last_name}
                            // topic="topic"
                            title={post.title}
                            postTime={post.published_at}
                            previewImagePath={post.preview_image_path}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        );
    }
}

export default NewsFeed;