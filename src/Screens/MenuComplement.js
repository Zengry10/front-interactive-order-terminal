import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

export default function MenuComplement(){
    let location = useLocation()
    let navigate = useNavigate()
    let [article, setArticle] = useState(null)
    let [error, setError] = useState(null)


    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            setError("Les données ne sont pas disponibles")
            navigate("/")
        }

    }, [])

    if (error) {
        return <div>{error}</div>
    }

    if (article && article.complements &&article.complements.length > 0 /* && article.complements[0].ingredients && article.complements[0].ingredients.length > 0*/  ) {
        return (
            <div className="h-full ">
              <p>ss</p>
              {
                article.complements.map((complement) => {
                  <p>{complement.name}</p>
                })
              }
            </div>

        )
    }
}
