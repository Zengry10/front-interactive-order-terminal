import { StoreContext } from '../Providers/Store'
import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';


export default function Panier(){
    let location = useLocation()
    const [commands, setCommandes] = useState('')
    const [article, setArticle] = useState(null)
    let [error, setError] = useState(null)
    const [lengthJson, setLengthJson] = useState(null)

    const navigate = useNavigate()
    
    function fetchMenu(){
        fetch('http://localhost:3333/order').then((res) => {
            res.json().then((json) =>{
                console.log(json)
                setLengthJson(json.length)
                   setCommandes(json.map((command) => {
                        const itemsString = command.items;
                        const itemsArray = itemsString.slice(2, -2).split("\",\"");
                        const items = itemsArray.map((item) => item.split("[")[0]);
                        return { ...command, items };
                   }))
                })
            }) 
    }
    useEffect(() => {
        fetchMenu()
    }, [])

    useEffect(() => {
        if (location && location.state && location.state.article) {
            setArticle(location.state.article)
        } else {
            setError("Les données ne sont pas disponibles")
            navigate("/")
        }

    }, [])


    if (commands && article) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex justify-end">
                    <p className="text-gray-600">Nombre d'articles dans le panier: {lengthJson}</p>
                </div>
              {commands.map((command) => {
                return (
                  <div key={command.id} className="bg-white w-full max-w-sm m-auto p-6 shadow-md rounded-lg m-4">
                    <div className="flex items-center mb-6">
                      <div className="flex-1">
                        <h4 className="font-bold">{command.name_menu}</h4>
                        <div className="mt-2">
                          <div className="text-sm text-gray-600">
                            {command.items.map((item) => (
                              <p className="flex items-center mb-2">
                                <svg className="w-4 h-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                    </div>
                  </div>
                );
              })}
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                        Commander
                    </button>
            </div>
          );
          
    }
    

}