import { useState } from "preact/hooks";

function Card({ image, date, id }) {

  const [loaded, setLoaded] = useState(false);
  const [liked, setLiked] = useState(JSON.parse(localStorage.getItem(id)) || false);

  const captureDate = new Date(date)
  const dateString = captureDate.toISOString().slice(0, 10).replaceAll('-', '/');

  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${dateString}/jpg/${image}.jpg`

  const likeHandler = () => {
    setLiked(!liked ? true : false);
    localStorage.setItem(id, !liked ? true : false);
  }

  return (
    <article className="card">
      {loaded ? null : <div className="loading"><i class="fas fa-circle-notch fa-spin"></i></div>}
      <img
          style={loaded ? {} : {display:'none'}}
          src={imageUrl}
          alt="random"
          onLoad={() => setLoaded(true)}
      />
      
      <div className="caption">
        <div className="text">
          <h2>EPIC IMAGE #{id.slice(8)}</h2>
          <h3>Captured on {captureDate.toLocaleTimeString('en-us', { weekday: 'short' })}</h3>
          <h4>{dateString}</h4>
        </div>
        <button className="btn-like" onClick={likeHandler}>
          {!liked ? <i class="far fa-heart"></i> : <i class="fas fa-heart"></i> }
        </button>
      </div>
    </article>
  )
}

export default Card
