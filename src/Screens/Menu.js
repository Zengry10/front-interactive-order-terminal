import React, { useState, useEffect } from 'react';

export default function Menu(){
 const [articles, setArticles] = useState('')

    function fetchMenu(){
        fetch('http://localhost:3333/admin/read/menu').then((res) => {
            res.json().then((json) =>{
                   console.log(json)
                   setArticles(json)
                   console.log(articles)
                })
            }) 
    }
    useEffect(() => {
        fetchMenu()
    }, [])
        if (articles) {
            return(
                <div>
                    <h1> ca marche{articles[0].description}</h1>
                    {articles.map((article) => {
                        return(
                            <div key={article.id}>
                                <h1>{article.name}</h1>
                               
                                <img src={article.picture} alt=""/>
                            </div>
                        )
                    }
                    )}
                </div>
            )
        }

}