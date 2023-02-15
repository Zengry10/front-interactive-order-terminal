import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom"
import { StoreContext } from '../Providers/Store'
import { useContext } from "react"


export default function Menu(){
 const [articles, setArticles] = useState('')
 const { role, requestOptions, token } = useContext(StoreContext);
//  console.log(requestOptions)
console.log(role)

const fetchSomthing = useCallback(() => console.log(articles), [])

function deleteMenu(id) {
    fetch('http://localhost:3333/menus/' + id, {
      method: 'DELETE',
      headers: {
        'access-control-allow-origin': '*',
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then((res) => {
        res.json().then((json) => {
          if (res.ok) {
            setArticles(old => old.filter(article => article.id !== id))
            // navigate('/client/menu')
          } else {
            alert('Donnée invalide');
            console.log(json)
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }



    function fetchMenu(){
        fetch('http://localhost:3333/menu', requestOptions).then((res) => {
            res.json().then((json) =>{
                //    console.log(json)
                   setArticles(json.data)
                //    console.log(articles)
                })
            }) 
    }
    useEffect(() => {
        fetchMenu()
    }, [])

    useEffect(() => {
      if (token){
        fetchMenu()
      }
    }, [token])
 

    if (articles) {
        return(
            <div id='scrollbar' className="flex flex-wrap items-center bg-orange-500 p-4 justify-center">
                {articles.map((article) => {
                    return(
                        <div key={article.id} className=" mt-10 gap-2 p-4 md:w-1/3 max-w-sm m-2 bg-white rounded-lg shadow-md mb-10 hover:shadow-lg hover:scale-105 transition duration-300">
                            <Link to={`/client/menu/${article.id}`} className="w-5" key={article.id} state={{ article: article }}>
                                <img className="w-full" src={article. picture} alt="menu item"/>
                                <div className="p-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold">{article.name}</h3>
                                    <p className="bg-red-600 text-white px-4 py-2 rounded-full">{article.price}€</p>
                                </div>
                            </Link>
                            {role === 'admin' && (
                                <div className="flex justify-between">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded-full">Modifier</button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-full" onClick={() => deleteMenu(article.id)}>Supprimer</button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }
    

}