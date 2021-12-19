import { React, useState, useEffect, Fragment } from "react";
import useSWR from "swr";
import axios from "axios";
import Card from "./Card";
import jsonData from "../../public/mockdata.json";

const fetcher = (url) => fetch(url).then((res) => res.json());
const endpoint = "";
const CardList = (props) => {
  const [rooms, setRooms] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getRandomRatingScore() {
    let max = 5.00;
    let min = 2.00;
    return (Math.random() * (max - min) + min).toFixed(1);
  }

  const fetchBooks = async () => {
    setLoading(true);
    setError(false);
    try {
      // console.log('api call start!', endpoint);
      const result = await axios.get(endpoint);
      console.log('api call end!', result.data.roomDocumentList);
      setRooms(result.data ? [].concat(...result.data.roomDocumentList) : []);
    } catch (error) {
      setError(true);
      setRooms(jsonData.roomDocumentList);
    }
    setLoading(false);
    props.apiCompleteHandling(false);
  };

  useEffect(() => {
    console.log(props.keyword);
    let param = `${props.checkinDate ? 'checkinDate='+props.checkinDate : 'checkinDate=20211210'}` + 
      `${props.checkoutDate ? '&checkoutDate='+props.checkoutDate : '&checkoutDate=20211212'}` + 
      `${props.adult ? '&adult='+props.adult : '&adult=4'}` + 
      `${props.child ? '&child='+props.child : ''}` + 
      `${props.baby ? '&baby='+props.baby : ''}` + 
      `${props.from ? '&from='+props.from : ''}` +
      `${props.size ? '&size='+props.size : ''}` +
      `${props.day ? '&day='+props.day : ''}` + 
      `${props.night ? '&night='+props.night : ''}` + 
      `${props.keyword ? '&query='+encodeURIComponent(props.keyword) : ''}`;

      console.log(param);

    if (props.search && (props.keyword !== undefined && props.keyword !== '')) {
      endpoint = `http://shineware.iptime.org:5050/search?` + param;
      fetchBooks();
    }
  }, [props]);

  useEffect(() => {
    setEmpty(!rooms || rooms?.length === 0 || rooms?.[0]?.length === 0);
  }, [rooms]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <div>API 통신 에러</div>
          <div>Mock data로 대체합니다.</div>
          <div>
            {rooms && rooms.map((room) => (
              <Fragment key={room.roomId}>
                <Card
                  id={room.roomId}
                  propertyName={room.propertyName}
                  ratingScoreAvg={room.ratingScoreAvg}
                  images={room.images}
                />
              </Fragment>
            ))}
          </div>
        </div>)}
      {empty ? <p>검색된 데이터가 존재하지 않습니다.</p> : null}
      <div>
        {rooms && rooms.map((room) => (
          <Fragment key={room.roomId}>
            <Card
              id={room.roomId}
              roomName={room.roomName}
              propertyName={room.propertyName}
              ratingScoreAvg={getRandomRatingScore()}
              images={room.images}
              maxUser={room.maxUser}
              price={room.price}
            />
          </Fragment>
        ))}
      </div>
      
    </div>
  );
}

export default CardList;