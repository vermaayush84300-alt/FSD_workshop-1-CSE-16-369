import profilePic from './image.png';

function Card() {
    return (
        <div className="card">
            <img src={profilePic} alt="profile picture"></img>
            <h2>My card</h2>
            <p>I make a youtube video and play video games</p>
        </div>
    );
}

export default Card;