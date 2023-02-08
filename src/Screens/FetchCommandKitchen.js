import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../Providers/Store'
import { useContext } from 'react';

export default function FetchCommandKitchen(){
    const navigate = useNavigate();
    const [commands, setCommandes] = useState('')
    const { role, setRole } = useContext(StoreContext);



    function Role(){
      if(role !== 'admin' && role !== 'cuisine'){
        navigate('/client/menu')
      }
    }

    useEffect(() => {
      Role()
    }, [])


    function fetchMenu(){
        fetch('http://localhost:3333/order').then((res) => {
            res.json().then((json) =>{
                   console.log(json)
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


    if (commands) {
        return (
            <div className="overflow-auto h-full">
              {commands.map((command) => {
                const date = new Date(command.updated_at);
                const time = date.toLocaleTimeString();
                return (
                  <div key={command.id} className="bg-white p-4 shadow-md rounded-lg m-4">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h1 className="font-bold text-xl underline">Commande #{command.id}</h1>
                        <h4 className="font-bold">{command.name_menu}</h4>
                        <div className="mt-2">
                          {command.items.map((item) => (
                              <p className="text-sm text-gray-600 flex">- {item}</p>
                          ))}
                        </div>
                        <p className="mt-2 font-medium text-gray-600">Heure de la commande : {time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
    }
}
