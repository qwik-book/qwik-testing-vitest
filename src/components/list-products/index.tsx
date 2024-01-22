import { component$ } from '@builder.io/qwik';

interface ProductItem {
  name: string;
  description: string;
  category: string;
  tags: Array<string>;
  price: number;
}

interface ProductsProps {
  list: Array<ProductItem>;
}

export const List = component$<ProductsProps>((props) => {
  const { list } = props;
  return (
    <div>
      <h1>Lista de productos en venta ({list.length})</h1>
      <ul>
        {list.map((product: ProductItem) => {
          return (
            <li key={product.name.toLowerCase()} item-type='product'>
              {product.name} - {product.price}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
