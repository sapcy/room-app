import React from "react";
import useEffect from "react";
import Image from "next/image";
import cardImage from "../../public/sample.jpg";
import styles from "../../styles/Home.module.css";

const imageLoader = ({ src, width, quality }) => {
  return `http://${src}?w=${width}&q=${quality || 75}`;
};

const RatingScorePer = (score) => {
  return String(score * 20.0) + "%";
};

const RatingScoreStar = (props) => {
  return (
    <div className="row">
      <span className={styles.placeListScore_ratingStars}>
        <i
          className={styles.placeListScore_stars}
          style={{ width: RatingScorePer(props.ratingScoreAvg) }}
        ></i>
      </span>
      {props.ratingScoreAvg}
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
            loader={props.images ? imageLoader : null}
            src={props.images ? props.images[0] : cardImage}
            // src={cardImage}
            alt="room"
            width={150}
            height={150}
          />
          <h4>{props.propertyName}</h4>
          <p style={{fontSize: 15}}>{props.roomName}</p>
          <p style={{fontSize: 15}}>최대인원 : {props.maxUser}명</p>
          <RatingScoreStar ratingScoreAvg={props.ratingScoreAvg} />
          <p style={{fontSize: 15, textAlign: "right"}}>{props.price}원</p>
        </div>
      </div>
    </>
  );
};

export default Card;