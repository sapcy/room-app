import { React, useState, useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import Card from './Card'
import cardImage from '../../public/sample.jpg'
import jsonData from '../../public/mockdata.json';

const fetcher = (url) => fetch(url).then((res) => res.json())

function CardList() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        // const endpoint = 'public/mockdata.json';

        // fetch(endpoint)
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res);
        //     setRooms([...res.roomDocumentList]);
        // });
        setRooms(jsonData.roomDocumentList);
        console.log(jsonData.roomDocumentList);
    }, [rooms]);

    // const { data, error } = useSWR('http://shineware.iptime.org:5050/search?checkinDate=20211210&checkoutDate=20211212&adult=4&query=%EA%B0%80%ED%8F%89', fetcher);

    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>

    // const rooms = data ? [].concat(...data.roomDocumentList) : [];
    const isEmpty = rooms?.[0]?.length === 0;

    return (
        <div>
            {isEmpty ? <p>NO DATA</p> : null}
            <div>
                {rooms.map(room => 
                    <div key={room.roomId}>
                        {<Card
                            id={room.roomId}
                            propertyName={room.propertyName}
                            ratingScoreAvg={room.ratingScoreAvg} 
                            images={room.images}
                        />}
                    </div>
                )}
            </div>
        </div>
    )
}
/**
 * 
            {isEmpty ? <p>NO DATA</p> : null}
            <div>
                {rooms.map(room => 
                    <div key={room.roomId}>
                        {<Card
                            id={room.roomId}
                            propertyName={room.propertyName}
                            propertyType={room.propertyType}
                            address={room.address} 
                            images={room.images} 
                        /> }
                        </div>
                        )}
                    </div>
 */

export default CardList;