import UserIntro from '../home/UserIntro.js'
function WhoToFollow() {
    return (
        <div className="WhoToFollow">
            <p>
                Who to follow
            </p>
            <div className="WhoToFollow_Container">
                <UserIntro />
                <UserIntro />
                <UserIntro />
                <UserIntro />
            </div>
        </div>
    )
}
export default WhoToFollow;