import React, { useState, useEffect } from 'react';

import { useLocation, useParams, useNavigate } from 'react-router-dom';

export default function MenuComplement(){
    // const { article } = useLocation().state;
    let location = useLocation()
    let navigate = useNavigate()
    let [article, setArticle] = useState(null)
    const params = useParams();
    console.log(location.state.article)

    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            navigate("/")
        }

    }, [])
    return(
        <div>
            <h1>dd</h1>
        </div>
    )
}