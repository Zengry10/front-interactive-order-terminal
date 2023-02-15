import { StoreContext } from '../Providers/Store'
import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';



export default function Panier(){
    const {  } = useContext(StoreContext);
    let location = useLocation()
    const [commands, setCommands] = useState('')
    const [article, setArticle] = useState(null)
    let [error, setError] = useState(null)
    const [lengthJson, setLengthJson] = useState(null)
    const { storeMenu, setStoreMenu } = useContext(StoreContext);

    const navigate = useNavigate()
    console.log(storeMenu)

    const uniqueStoreMenu = storeMenu.filter((item, index, self) => {
      return self.findIndex(t => t.name === item.name) === index;
    });
    console.log(storeMenu.length)

    function SendDataOrder() {
      fetch('http://localhost:3333/order', {
        method: 'POST',
        headers: {
          'access-control-allow-origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name_menu: article.name,
          items: uniqueStoreMenu.map(item => item.name),
        }),
      })
        .then((res) => {
          res.json().then((json) => {
            if (res.ok) {
              console.log(json)
              alert('Votre commande a bien été prise en compte, votre numéro de commande est le : #' + json.id + '.')
              navigate('/client/menu')
            } else {
              alert('Donnée invalide');
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }



    const deleteCommand = (id) => {
      setCommands(commands.filter((command) => command.id !== id));
    };
    
    function fetchMenu(){
        fetch('http://localhost:3333/order').then((res) => {
            res.json().then((json) =>{
                console.log(json)
                setLengthJson(json.length)
                   setCommands(json.map((command) => {
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
        }

    }, [])

    if (commands && article) {
        return (
          <div className="flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-6 justify-center flex-col">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-500 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17,2 L17,4 C17,4 16.5,5 14,5 L6,5 C3.5,5 3,4 3,4 L3,2 L17,2 Z M6,7 L8,7 L8,19 L6,19 L6,7 Z M10,7 L12,7 L12,19 L10,19 L10,7 Z M14,7 L16,7 L16,19 L14,19 L14,7 Z"/>
                  </svg>
                  <h2 className="text-lg font-bold">Panier</h2>
                </div>
                <p className="text-sm text-gray-600"><span className='font-bold	'>{lengthJson} </span>articles</p>
              </div>
            </div>

            {commands.map((command) => {
            return (
              <div
                key={command.id}
                className="bg-white w-full max-w-sm m-auto p-6 shadow-md rounded-lg m-4 relative"
              >
                  <button className="text-red-500 hover:text-red-700 absolute top-0 right-0 p-3 font-bold" onClick={() => deleteCommand(command.id)}>
                    &times;
                  </button>
                <div className="flex items-center mb-6">
                  <div className="flex-1">
                    <h4 className="font-bold">
                      {command.name_menu}
                      <p className="text-sm text-gray-600">Article n°{command.id}</p>
                    </h4>
                    <div className="mt-2">
                      <div className="text-sm text-gray-600">
                        {command.items.map((item) => (
                          <p className="flex items-center mb-2">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          <div className="flex justify-center">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded" onClick={() => alert('Votre commande a bien été prise en compte') + navigate('/client/menu')}>
              Commander
            </button>
          </div>
        </div>
      );

      }

    

}