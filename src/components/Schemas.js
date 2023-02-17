import React from 'react';
import axios from "axios";
import { useState } from "react";
import './CSS/schemas.css';
import Tables from './Tables';
import Views from './Views';

export default function Schemas(props) {

    const [schemas, setSchemas] = useState([]);
    const [loading, setLoading] = useState(true)
    const requestBody = props.body;
    const selectedCatalog = props.schemas;


    if (schemas.length === 0) {
        const url = "http://localhost:8080/dextrus/" + selectedCatalog;
        axios.post(url, requestBody)
            .then(response => {
                setSchemas(response.data)
                console.log(response.data)
                setLoading(false)
            }).catch(error => {
                console.log("catch")
                console.log(error)
            });
    }

    const [expandSchema, setExpandSchema] = useState(null);
    const toggleExpand = (schema) => {
        setExpandSchema(prevTopic => prevTopic === schema ? null : schema);
    };

    const [showTables, setShowTables] = useState(false);

    const handleTablesButton = () => {
        setShowTables(!showTables);
    };
    const [showViews, setShowViews] = useState(false);

    const handleViewsButton = () => {
        setShowViews(!showViews);
    };

    return (
        <div >
            {loading ? (<div>loading...</div>):( 
            schemas.map(schema => (
                <div key={schema} className="schemas-pnt">
                    <button className="schema-cld" onClick={() => toggleExpand(schema)}>
                        <i class="bi bi-folder-fill"></i>{schema}
                    </button>
                    {expandSchema === schema && (
                        <div className='table-view'>
                            <div onClick={() => handleTablesButton()}>

                                <i class="bi bi-plus-square-fill" style={{ paddingRight: "5px" }} ></i>Tables</div>
                            {
                                showTables && <Tables body={requestBody} catalog={selectedCatalog} schema={schema} />
                            }
                            <div onClick={() => handleViewsButton()}>

                                <i class="bi bi-plus-square-fill" style={{ paddingRight: "5px" }}></i>Views</div>
                            {
                                showViews && <Views body={requestBody} catalog={selectedCatalog} schema={schema} />
                            }
                        </div>
                    )}
                </div>
           ) ))}
        </div>
    )
}