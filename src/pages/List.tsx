import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"

const List = () => {
  const queryClient = useQueryClient()
  const {data, isError, isLoading} = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/products")
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  })
  const {mutate} = useMutation({
    mutationFn: async (id: number) => {
      try {
        const response = await axios.delete(`http://localhost:3000/products/${id}`)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["PRODUCTS"]
      }
      )
    }
  })

  if(isError) return <div>Error</div>
  if(isLoading) return <div>Loading</div>
const removeProduct = (id: number) => {
  mutate(id)
}
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Ten</th>
            <th>Gia</th>
            <th>Anh</th>
            <th>Mo ta</th>
            <th>Chuc nang</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product: {id?: number|undefined, name: string, price: number, image: string, desc: string}, index: number) => (
            <tr key={product?.id}>
              <td>{index + 1}</td>
              <td>{product?.name}</td>
              <td>{product?.price}</td>
              <td><img src={product?.image} alt="" /></td>
              <td>{product?.desc}</td>
              <td>
                <Link to={`/products/${product.id}/edit`}>
                <button>Cap nhat</button></Link>
                <button onClick={() => window.confirm("xoa")&& removeProduct(product.id!)}>Xoa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default List