import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PictureMenu from "./PictureMenu";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../Providers/Store";

export default function CreateMenu(){
  let navigate = useNavigate()
    const { register, handleSubmit, formState: {errors } } = useForm()
    const { role, setRole } = useContext(StoreContext);
    console.log(role)
    const localhost = 'http://localhost:3333/image/Menu/'

    function Role(){
      if(role !== 'admin'){
        navigate('/client/menu')
      }
    }

    useEffect(() => {
      Role()
    }, [])

    
    function SendDataOrder(data) {
      
      fetch('http://localhost:3333/menu', {
        method: 'POST',
        headers: {
          'access-control-allow-origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          picture : localhost + data.picture[0].name,
          price: data.price,
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
              console.log(localhost + data.picture[0].name);
            }
          });
        })
    }

        return(
          <div className="flex flex-col items-center mt-16">
            <h1 className="text-2xl font-bold mb-8">Création d'un menu</h1>
            <Link to={'/admin/create/pictureMenu'}><p  className=" rounded-lg p-4 bg-orange-500">Avant de crée un menu, <span className="underline">cliquer ici</span> pour enregistrer la photo de votre futur menu. Une fois cette étape compléter vous pourrez crée votre nouveau menu</p></Link>
            <form className="w-full max-w-sm" onSubmit={handleSubmit(SendDataOrder)}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Nom du menu
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                  Description du menu
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  type="text"
                  {...register("description", { required: true })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="picture">
                  Image du menu
                </label>
                
                <label htmlFor="image">Sélectionnez une image :</label>
                <input 
                  type="file" 
                  id="image" 
                  name="image"
                  {...register("picture", { required: true })}
                
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                  Prix du menu
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  {...register("price", { required: true })}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-orange-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        )
    }
    