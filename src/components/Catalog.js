import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Schemas from './Schemas';
import './CSS/catalog.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Catalog = () => {
    const location = useLocation();
    const requestBody = location.state;
    const [loading,setLoading]=useState(true)
    const [catOpen, setcatOpen] = useState(false);
    const [catalogs, setCatalogs] = useState([]);
    const [ExpandCatalog, setExpandCatalog] = useState(null);

    const handleCatalog = () => {
        setcatOpen(!catOpen)
        if (catalogs.length === 0) {
             axios.post("http://localhost:8080/dextrus/",requestBody)
                .then(response => {
                    setCatalogs(response.data)
                    toast.success("Connection Successful");
                    setLoading(false)
                }).catch(error => {
                    console.log("catch")
                    console.log(error)
                });
        }
    }
    const toggleExpand = (catalog) => {
        setExpandCatalog(prevTopic => prevTopic === catalog ? null : catalog);
    };

    return (

        <div className="left-nav">
            <div className="cat" onClick={handleCatalog}>
            <i class="bi bi-journal"></i><button>Catalogs</button>
            </div>
            {catOpen &&
                <div>
                  {loading ? (<div>loading...</div>):(
                    catalogs.map(catalog => (
                        <div key={catalog} className="catalog-pnt">
                            <button className="catalog-cld" onClick={() => toggleExpand(catalog)}>
                                <i class="bi bi-database-add"></i>{catalog}
                            </button>
                            {ExpandCatalog === catalog && (
                                <Schemas body={requestBody} schemas={catalog} />
                            )}
                        </div>
                    )))}

                </div>
            }

            <ToastContainer />
        </div>

    );
};

export default Catalog;