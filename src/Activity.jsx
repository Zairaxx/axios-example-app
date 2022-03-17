import React, { useState } from 'react'

const Activity = () => {

    const [activity, setActivity] = useState(null);

    const getActivity = async () => {
        console.log("Fetching activity...")
        let query = "";

        //check price
        let isFree = document.querySelector("#isFree").checked;
        if(isFree){
            query+="?price=0.0";
        }
        //check participants
        let participants = document.querySelector("#participants").value;

        if(participants){
            if(query !== "")
            query+=`&participants=${participants}`
            else {
                query+=`?participants=${participants}`
            }
        }
        
        //check type
        let type = document.querySelector("#type").value;
        if(type !== "all"){
            if(query !== ""){
                query += `&type=${type}`
            }
            else {
                query += `?type=${type}`
            }
        }

        let response = await fetch(`http://www.boredapi.com/api/activity/${query}`);
        let json = await response.json();
        setActivity(json);

        setActivity(response.data);
        //Lägg in json i state
    }
    let listOfTypes = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    return (
        <div>
            <h2>Activity</h2>
            <div>
                <label htmlFor="isFree">Free activity</label>
                <input type="checkbox" name="isFree" id="isFree"/>
            </div>
            <div>
                <label htmlFor="participants">Participants</label>
                <input type="number" name="participants" id="participants"/>
            </div>
            <div><label htmlFor="type">Type:</label>
                <select name="type" id="type">
                    <option value="all">all</option>
                    {listOfTypes.map((type,i) => <option value={type} key={i}>{type}</option>)}
                </select>
            </div>
            <button onClick={getActivity}>Get activity</button>
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
