import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from '../../Providers/Store'


export default function EditBurger(){
    let { state } = useLocation();
    // console.log(state)

    const navigate = useNavigate();
    const [article, setArticle] = useState(state.article);
    console.log(article)

    function SendDataOrder(data) {
      
        fetch('http://localhost:3333/burger', {
          method: 'PUT',
          headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            name: data.name,
            stock: data.stock,
            price: data.price,
            ingredients: data.ingredients,
          }),
        })
          .then((res) => {
            res.json().then((json) => {
              if (res.status === 201 || res.status === 200) {
                alert('Donnée envoyée');
                console.log(data)
                navigate('/client/menu')
              } else {
                alert('Donnée invalide');
              }
            });
          })
      }

      if (state){
        return(
            <div className="flex flex-col items-center mt-16">
                <p>{article.stock}</p>
            </div>
          )
      }

  
}