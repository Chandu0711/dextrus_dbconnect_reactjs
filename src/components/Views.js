import React, { useState } from 'react'
import axios from "axios";
import './CSS/views.css'
import Columns from './Column';

export default function Views(props) {

    const url = "http://localhost:8080/dextrus/" + props.catalog + "/" + props.schema;
    const [views, setViews] = useState([]);
    const[loading,setLoading]=useState(true)

    if (views.length === 0) {
        axios.post(url, props.body)
            .then(response => {
                if (response.data.length !== 0) {
                    const viewNames = response.data
                        .filter(view => view.table_type === 'VIEW')
                        .map(view => view.table_name);
                    setViews(viewNames);
                    setLoading(false)
                }
                else {
                    console.log("no views")
                    alert("No views to display")
                }
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandView, setexpandView] = useState(null);
    const toggleExpand = (view) => {
        setexpandView(prevView => prevView === view ? null : view);
    }



    return (
        <div >
            {loading ? (<div>loading...</div>):(
            views.map(view => (
                <div key={view} className='views-pnt'>
                    <button className='views-cld' onClick={() => toggleExpand(view)}>
                    <i class="bi bi-files"></i> {view}
                    </button>
                    {
                        expandView === view && (
                            <Columns body={props.body} url={url} view={view} />
                        )
                    }
                </div>
            )))}
        </div>
    )
}