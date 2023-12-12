import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Add = () => {
  const queryClient  = useQueryClient()
  const navigate = useNavigate()
  const {mutate} = useMutation({
    mutationFn: async(product: {name: string, price:  number, image: string, desc: string}) => {
      try {
        const response = await axios.post(`http://localhost:3000/products`, product)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"]
      })
      alert(" Them thanh cong")
      reset()
      setTimeout(() => {
        navigate('/products')
      }, 2000);
    }
  })

  const {register, handleSubmit, formState: {errors}, reset, } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      desc: ""
    }
  })
  const onSubmit: SubmitHandler<{name: string, price:  number, image: string, desc: string}> = (data) => {
    mutate(data)
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-ground">
          <div className="form-label">Ten san pham</div>
          <input type="text"
          className="form-coltrol" 
          placeholder="Ten san pham"
          {...register('name', {required: true})}/>
          {errors.name &&(
            <p>Khong bo trong</p>
          )}
        </div>
        <button className="btn btn-danger">Them</button>
      </form>
    </div>
  )
}

export default Add