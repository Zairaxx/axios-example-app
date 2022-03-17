import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Activity = () => {

    const [activity, setActivity] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [type, setType] = useState("");
    const [isFree, setIsFree] = useState(false);
    useEffect(() => {
        getActivity();
    },[isFree, participants,type])
    const getActivity = async () => {
        console.log("Fetching activity...")

        let myParams = {
            participants,
            type,
        }
        if(isFree === true){
            myParams.price = "0.0"
        }
        const response = await axios.get(`http://www.boredapi.com/api/activity`,
        { params:myParams })
        setActivity(response.data);
    }
    let listOfTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    return (
        <div>
            <h2>Activity</h2>
            <div>
                <label htmlFor="isFree">Free activity</label>
                <input type="checkbox" name="isFree" id="isFree" onChange={
                    () => {setIsFree(!isFree)}
                }/>
            </div>
            <div>
                <label htmlFor="participants">Participants</label>
                <input type="number" name="participants" id="participants" onChange={(e) => {setParticipants(e.target.value)}}/>
            </div>
            <div><label htmlFor="type">Type:</label>
                <select name="type" id="type" onChange={(e)=>{setType(e.target.value)}}>
                    <option value="">all</option>
                    {listOfTypes.map((type,i) => <option value={type} key={i}>{type}</option>)}
                </select>
            </div>
            {/* <button onClick={getActivity}>Get activity</button> */}
            {activity && <div className="activity-container">
                <p>Activity: {activity.activity}</p>
                <p>Price: {activity.price}</p>
                <p>Participants: {activity.participants}</p>
                <p>Type: {activity.type}</p>
            </div>}
        </div>
    )
}

export default Activity
