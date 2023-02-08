import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
export default function PictureMenu(){
  const { register, handleSubmit, formState: {errors } } = useForm()
  let navigate = useNavigate()
    function SendDataOrder(data) {
        const formData = new FormData();
        formData.append("cover_image", data.picture[0]);

        fetch('http://localhost:3333/posts', {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              alert('Merci, vous pouvez désormais crée votre menu en y ajoutant la photo du menu que vous venez de choisir.');
              console.log(data)
              navigate('/admin/menu/create')
            } else {
              alert(`Donnée non envoyée, status de la réponse : ${res.status}`);
            }
          })
          .catch((error) => {
            console.error('Erreur lors de l\'envoi de la requête : ', error);
          });
        }
    return(
      <div className="flex flex-col items-center mt-16">
        <form onSubmit={handleSubmit(SendDataOrder)}>
          <div className="w-full max-w-sm">
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Sélectionnez une image :
            </label>
            <input 
              type="file" 
              id="image" 
              name="image"
              className="border border-gray-400 p-2 w-full"
              {...register("picture", { required: true })}
            />
            <p className="text-red-500 text-xs italic">{errors.picture && "Image est requise"}</p>
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded">Envoyer</button>
        </form>
      </div>
    )


    }
