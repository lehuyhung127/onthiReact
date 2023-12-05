import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const Add = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async (product: {name: string, price: number}) => {
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
      alert('Ban da them sann pham thanh cong')
      reset()
      setTimeout(() => {
        navigate("/products")
      }, 2000)
    }
  })
  const { register, handleSubmit, formState: { errors }, reset,
  } = useForm({
    defaultValues: {
      name: "",
      price: 0
    }
  })

  const onSubmit: SubmitHandler<{name: string, price: number}> = (data) => {
     mutate(data)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-ground">
          <div className="form-label">Ten san pham</div>
          <input
            className="form-control"
            type="text"
            {...register("name", { required: true })}
            placeholder="Ten san pham"
          />
          {errors.name && (
            <p className="error-message">Vui lòng nhập tên sản phẩm</p>
          )}
        </div>
        <div className="form-ground">
          <div className="form-label">Gia san pham</div>
          <input
            className="form-control"
            type="number"
            {...register("price", { required: true, min: 1 })}
            placeholder="Gia san pham"
          />
          {errors.price && (
            <p className="error-message">Vui lòng nhập giá sản phẩm lớn hơn 0</p>
          )}
        </div>
        <button className="btn btn-primary">Them</button>
      </form>
    </div>
  )
}

export default Add