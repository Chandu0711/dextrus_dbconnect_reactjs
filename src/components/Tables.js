import React, { useState } from 'react'
import axios from "axios";
import './CSS/tables.css'
import Columns from './Column';

export default function Tables(props) {

    const url = "http://localhost:8080/dextrus/" + props.catalog + "/" + props.schema;
    const [tables, setTables] = useState([]);
    const[loading,setLoading]=useState(true)

    if (tables.length === 0) {
        axios.post(url, props.body)
            .then(response => {
                if (response.data.length !== 0) {
                    const tableNames = response.data
                        .filter(table => table.table_type === 'BASE TABLE')
                        .map(table => table.table_name);
                    setTables(tableNames);
                    setLoading(false)
                }
                else {
                    console.log("no tables")
                    alert("No tables to display")
                }
               
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandTable, setExpandTable] = useState(null);
    const toggleExpand = (table) => {
        setExpandTable(prevTable => prevTable === table ? null : table);
    }
    return (
        <div>
            {loading ? (<div>loading...</div>):(
            tables.map(table => (
                <div key={table} className='table-pnt'>
                    <div className='table-cld' onClick={() => toggleExpand(table)}>
                    <i class="bi bi-table"></i>{table}
                    </div>
                    {
                        expandTable === table && (
                            <Columns body={props.body} url={url} table={table} />
                        )
                    }
                    
                </div>
           ) ))}
        </div>
    )
}