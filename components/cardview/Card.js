import React from "react";
import useEffect from "react";
import Image from "next/image";
import cardImage from "../../public/sample.jpg";
import styles from "../../styles/Home.module.css";

const imageLoader = ({ src, width, quality }) => {
  return `http://image.goodchoice.kr/resize_490x348/affiliate/2019/06/12/${src}?w=${width}&q=${
    quality || 75
  }`;
};

const RatingScorePer = (score) => {
  return String(score * 20.0) + "%";
};

const RatingScoreStar = (props) => {
  return (
    <div className={styles.placeListScore_container}>
      <div className={styles.placeListScore_rating}>
        <span className={styles.placeListScore_ratingStars}>
          <i
            className={styles.placeListScore_stars}
            style={{ width: RatingScorePer(props.ratingScoreAvg) }}
          ></i>
          {props.ratingScoreAvg}
        </span>
      </div>
    </div>
  )
}

const Card = (props) => {
  // useEffect(() => {
  //     console.log('props', props.images[0]);
  // }, [props])

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Image
            className="card-img"
            // lodaer={imageLoader}
            // src={props.images}
            src={cardImage}
            alt="room"
            width={150}
            height={150}
          />
          <h3>{props.propertyName}</h3>
          <RatingScoreStar ratingScoreAvg={props.ratingScoreAvg} />
        </div>
      </div>
    </>
  );
};

export default Card;
