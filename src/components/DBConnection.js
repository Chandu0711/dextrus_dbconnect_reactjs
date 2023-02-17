import './CSS/dbconnection.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function DBConnection() {

    const navigate = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'withCredentials': true
    };

    const [data, setData] = useState({
        url: '',
        username: '',
        password: ''
    });
    const databody = JSON.stringify(data);

    const handleChange = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
       

        axios.post('http://localhost:8080/dextrus/connect', databody,{ headers: headers, cache: false })
            .then(response => {
                console.log(response.data);
                navigate("/home", { state: data })
            })
            .catch(error => {
                toast.error("Error: Connection to Server!", {
                })
                console.log(error);
            });
    };
    return (
        <div>
            <div>
                <h1>Connection to Dextrus Server</h1>
            </div>
            <div className="main">
                <div className="card">
                    <div className="card-header">
                        <div className="text-header">SQL Server</div>
                    </div>      
                    <div className="card-body">
                        <form  onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Server Name:</label>
                                <input required="" className="form-control" name="url" id="url" type="text" placeholder='Enter url' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Username:</label>
                                <input required="" className="form-control" name="username" id="username" type="text" placeholder='Enter username' onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input required="" className="form-control" name="password" id="password" type="password" placeholder='Enter password' onChange={handleChange} />
                            </div>
                            <div className="button">
                                <input type="submit" className="btn" value="submit" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}
export default DBConnection;