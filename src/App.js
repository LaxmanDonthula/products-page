import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        this.setState({ products });
      })
      .catch(error => console.error("Error fetching products:", error));
  }

  render() {
    const { products } = this.state;

    return (
      <Router>
        <div className="App">
          <h1>Fake Store</h1>
          <Routes>
            <Route path="/" element={<ProductGrid products={products} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <Link to={`/product/${product.id}`} className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  let { id } = useParams();
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(product => {
        setProduct(product);
      })
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  return (
    <div className="product-details">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Description:</strong> {product.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
