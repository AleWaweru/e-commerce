import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "@/utils/product";
import ListRating from "./ListRating";

interface Iparams {
  productId?: string;
}

const Product = ({params}: {params: Iparams}) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product = {product}/>
        <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <ListRating product={product}/>
        </div>
      </Container>
    </div>
  )
}

export default Product;