import { useParams } from "react-router-dom"
import React from 'react'
const ServerPage = () => {
    let { id } = useParams();
    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    )

}

export default ServerPage