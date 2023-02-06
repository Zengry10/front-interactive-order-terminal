import { useForm } from "react-hook-form";
export default function Test(){
  const { register, handleSubmit, formState: {errors } } = useForm()

    function SendDataOrder(data) {
        const formData = new FormData();
        formData.append("cover_image", data.picture[0]);

        fetch('http://localhost:3333/posts', {
          method: 'POST',
          body: formData,
        })
          .then((res) => {
            if (res.status === 201 || res.status === 200) {
              alert('Donnée envoyée');
              console.log(data)
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
                <label htmlFor="image">Sélectionnez une image :</label>
                <input 
                    type="file" 
                    id="image" 
                    name="image"
                    {...register("picture", { required: true })}
                />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )


    }
