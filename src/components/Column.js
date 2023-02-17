import React, { useState } from 'react'
import axios from "axios";
import './CSS/column.css'

export default function Columns(props) {

    const [columns, setColumns] = useState([]);
    const[loading,setLoading]=useState(true)

    if (columns.length === 0) {
        axios.post(props.url + "/" + props.table, props.body)
            .then(resp => {
                const columnNames = resp.data
                    .map(column => column.columnName);
                setColumns(columnNames);
                setLoading(false)
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    return (
        <div className='columns-pnt'>
            {loading ? (<div>loading...</div>):(
                columns.map(column => (
                    <div className='column-cld'><i class="bi bi-layout-text-sidebar-reverse"></i>{column}</div>
                ))
            )}
        </div>
    )
}