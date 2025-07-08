import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './component.css';

function StarRating({ rating, outOf = 5 }) {
  const stars = [];

  for (let i = 0; i < outOf; i++) {
    const diff = rating - i;

    if (diff >= 0.95) {
      stars.push(<FaStar key={i} className="star-icon full" />);
    } else if (diff >= 0.25) {
      stars.push(<FaStarHalfAlt key={i} className="star-icon half" />);
    } else {
      stars.push(<FaRegStar key={i} className="star-icon empty" />);
    }
  }

  return <div className="star-rating">{stars}</div>;
}

export default StarRating;
