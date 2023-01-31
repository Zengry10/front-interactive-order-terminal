import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

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
                <div className="flex flex-wrap items-center bg-orange-500 p-4 justify-center">
                {articles.map((article) => {
                    return(
                        
                            <div key={article.id} className="w-full md:w-1/3 max-w-sm m-2 bg-white rounded-lg shadow-md">
                                <Link to={`/menu/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
                                    <img className="w-full" src={article.picture} alt="menu item"/>
                                    <div className="p-4 flex items-center justify-between">
                                        <h3 className="text-xl font-bold">{article.name}</h3>
                                        <p className="bg-red-600 text-white px-4 py-2 rounded-full">{article.price}€</p>
                                    </div>
                                </Link>
                            </div>
                        
                    )
                })}
                </div>
            )
        }

}