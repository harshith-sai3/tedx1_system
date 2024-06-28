import React, { useState } from 'react';
import Data from '../teddata';

const Ted = () => {
    // Initialize a Set to store unique topic names
    let uniqueTopicNames = new Set();

    // Loop through each entry and extract topic names
    Data.forEach(entry => {
        const topics = JSON.parse(entry.topics);  // Parse the JSON string in the topics field
        topics.forEach(topic => uniqueTopicNames.add(topic.name));  // Add each topic name to the Set
    });

    // Convert the Set back to an array (if needed) and store in state
    const allTopicNames = Array.from(uniqueTopicNames);

    // Use state to manage topic names
    const [catItems, setCatItems] = useState(allTopicNames);

    const[items,setItems]=useState(Data);

    const[filtername,setFiltername]=useState('All');

    const filteritem=(catitem)=>{
        setFiltername(catitem)
        if(catitem==='All'){
            setItems(Data);
            return;
        }
        const updateditem=Data.filter((currElem)=>
        {
            return currElem.topics.includes(catitem)
        })
        setItems(updateditem);
    }

    const changeHandler=(event)=>{
        let search=Data.filter((currElem)=>{
            return( 
                currElem.title.toLowerCase().replaceAll(' ','').includes(event.target.value.toLowerCase().replaceAll(' ','')) ||
                currElem.speakers.toLowerCase().replaceAll(' ','').includes(event.target.value.toLowerCase().replaceAll(' ',''))
            )
        })
        setItems(search)
    }

    return (
        <div className=' bg-red-300 min-h-[100vh]'>
            <div className='text-center font-bold text-xl'>TEDx Recommendation</div>

            <div className="search-box my-2 ml-2 flex justify-center">
                <input type="text"
                placeholder='search'
                className=' border border-black px-2 py-2 rounded-md text-xl' 
                onChange={changeHandler}
                />
                
            </div>

            <div className="navbar flex justify-evenly overflow-x-auto md:gap-4">
                {catItems.map((currElem, index) => {
                    return <button
                     className=' bg-blue-200 p-1 rounded-md md:p-2 '
                     key={index} onClick={()=>filteritem(currElem)}>{currElem}</button>
                })}
            </div>
            
            <div className=" w-[80%] mx-auto ">
                {
                    items.map((currElem)=>{
                      return <a href={currElem.page_url}> <div className="card bg-blue-200 my-3 rounded-lg p-2">
                                <h1 className=' font-semibold'>{currElem.title}</h1>
                                <p>{currElem.summary}</p>
                                {/* <p>{currElem.published_date}</p> */}
                                <p>{currElem.recorded_date}</p>
                                <p>{currElem.duration}sec</p>
                                {/* <p>{currElem.topics}</p> */}
                                <p>{currElem.speakers}</p>
                            </div>
                            </a>
                    })
                }
            </div>
        </div>
    );
}

export default Ted;
