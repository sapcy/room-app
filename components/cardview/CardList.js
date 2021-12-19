import { React, useState, useEffect } from "react";
import useSWR from "swr";
import Card from "./Card";
import jsonData from "../../public/mockdata.json";

const fetcher = (url) => fetch(url).then((res) => res.json());
const endpoint = "";
function CardList(props) {
  const [rooms, setRooms] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await axios.get(`${endpoint}`);
      setRooms(result.data ? [].concat(...result.data.roomDocumentList) : []);
    } catch (error) {
      setError(true);
      setRooms(jsonData.roomDocumentList);
      // setRooms(null);
    }
    setLoading(false);
    props.apiCompleteHandling(false);
  };

  useEffect(() => {
    if (props.search && (props.keyword !== undefined && props.keyword !== '')) {
      endpoint = `http://shineware.iptime.org:5050/search?checkinDate=20211210&checkoutDate=20211212&adult=4&query=${encodeURIComponent(props.keyword)}`;
      console.log(endpoint);
      fetchBooks();
      // fetch(endpoint)
      //   .then(res => res.json())
      //   .then(res => {
      //       console.log(res);
      //       setRooms(res.roomDocumentList ? [].concat(...res.roomDocumentList) : []);
      //   });
    }
    // setRooms([]);
  }, [props.search]);

  useEffect(() => {
    setEmpty(!rooms || rooms?.length === 0 || rooms?.[0]?.length === 0);
    // console.log(rooms?.[0]?.length === 0);
  }, [rooms]);

  // const rooms = data ? [].concat(...data.roomDocumentList) : [];
  // const empty = rooms?.[0]?.length === 0;

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && (
        <div>
          <div>API 통신 에러</div>
          <div>Mock data로 대체합니다.</div>
        </div>)}
      {empty ? <p>검색된 데이터가 존재하지 않습니다.</p> : null}
      <div>
        {rooms && rooms.map((room) => (
          <div key={room.roomId}>
            {
              <Card
                id={room.roomId}
                propertyName={room.propertyName}
                ratingScoreAvg={room.ratingScoreAvg}
                images={room.images}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardList;
