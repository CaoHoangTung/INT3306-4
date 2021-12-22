import React from 'react';
import '../../pages/main/Main.scss'
import { getPosts } from "../../api/posts.js";
import InfiniteScroll from "react-infinite-scroll-component";
import PostInProfile from "./PostInProfile.js";

class ProfileFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            user_id: this.props.user_id,
            page: 0,
            limit: this.props.limit,
            has_more: true,
            isOwner: this.props.isOwner,
        };
    }

    componentDidMount() {
        this.fetchMoreData();
    }

    fetchMoreData = async () => {
        var { _, user_id, page, limit } = this.state;
        await getPosts(
            user_id, [], false, page, limit
        ).then(newPosts => {
            this.setState({
                posts: this.state.posts.concat(newPosts),
                page: this.state.page + 1,
            });
            if (newPosts.length < limit) {
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
                        <PostInProfile
                            key={"PostInProfile" + post.post_id}
                            author_name={post.user_detail.first_name + " " + post.user_detail.last_name}
                            avatar_path={post.user_detail.avatar_path}
                            post={post}
                            isOwner={this.state.isOwner}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        );
    }
}

export default ProfileFeed;