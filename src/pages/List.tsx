import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom";
const List = () => {
  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["PRODUCTS"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/products")
        return response.data
      } catch (error) {
        console.log(error)
      }
    }
  });
  // xoa san pham
  const {mutate} = useMutation({
    mutationFn: async(id: number) => {
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
      })
    }
  })
  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error</div>

  
  const removeProduct = (id: number) => {
    mutate(id)
  }
  // end xoa san pham
  return (
<div>
  <Link to="/products/add"> Them san pham</Link>
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>Teen sanr pham</th>
          <th>Gia</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((product: { id?: number | undefined, name: string, price: number }, index: number) => (
          <tr key={product?.id}>
            <td>{index + 1}</td>
            <td>{product?.name}</td>
            <td>{product?.price}</td>
            <table>
              <button className="btn btn-danger">Cap nhat</button>
              <button className="btn btn-primary" onClick={() => window.confirm("Ban chac chan muon xoa khong?") && removeProduct(product.id!)}>Xoa</button>

            </table>
          </tr>
        ))}
      </tbody>
    </table>

  </div>
  )
  

}

export default List