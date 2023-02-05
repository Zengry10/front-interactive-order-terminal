import { useForm } from "react-hook-form";
export default function CreateMenu(){
    const { register, handleSubmit, formState: {errors } } = useForm()
    
    function SendDataOrder(data) {
      fetch('http://localhost:3333/admin/create/menu', {
        method: 'POST',
        headers: {
          'access-control-allow-origin': '*',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          picture : data. picture,
          price: data.price,
        }),
      })
        .then((res) => {
          res.json().then((json) => {
            if (res.status === 201 || res.status === 200) {
              alert('Donnée envoyée');
            } else {
              alert('Donnée invalide');
              console.log(data.name);
            }
          });
        })
    }

        return(
          <div className="flex flex-col items-center mt-16">
            <h1 className="text-2xl font-bold mb-8">Création d'un menu</h1>
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
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id=" picture"
                  type="text"
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
    