import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1270.jpg", cost: "$15", description: "Produces oxygen at night." },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1270.jpg", cost: "$12", description: "Filters formaldehyde." },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2017/02/15/10/39/plants-2068219_1270.jpg", cost: "$18", description: "Removes toxins." },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/06/09/04/24/fern-5276332_1270.jpg", cost: "$14", description: "Adds humidity." },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/06/07/20/03/rubber-plant-5272186_1270.jpg", cost: "$20", description: "Easy to grow." },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/09/20/44/aloe-vera-3305411_1270.jpg", cost: "$10", description: "Healing properties." }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2017/04/26/19/30/lavender-2263595_1270.jpg", cost: "$20", description: "Calming scent." },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2017/05/31/18/05/jasmine-2361298_1270.jpg", cost: "$18", description: "Sweet fragrance." },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2016/09/10/11/40/rosemary-1659024_1270.jpg", cost: "$15", description: "Herbal aroma." },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/03/19/21/mint-1120042_1270.jpg", cost: "$8", description: "Fresh smell." },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/07/16/20/46/lemon-balm-4342205_1270.jpg", cost: "$10", description: "Citrus scent." },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2016/04/10/22/47/hyacinth-1320626_1270.jpg", cost: "$22", description: "Vibrant flowers." }
      ]
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        { name: "Marigold", image: "https://cdn.pixabay.com/photo/2017/08/30/17/27/marigold-2697368_1270.jpg", cost: "$10", description: "Repels bugs." },
        { name: "Citronella", image: "https://cdn.pixabay.com/photo/2019/08/24/10/43/citronella-4427506_1270.jpg", cost: "$14", description: "Natural mosquito repellent." },
        { name: "Catnip", image: "https://cdn.pixabay.com/photo/2015/07/02/20/37/catnip-829671_1270.jpg", cost: "$9", description: "Repels mosquitoes." },
        { name: "Basil", image: "https://cdn.pixabay.com/photo/2016/08/05/20/56/basil-1574092_1270.jpg", cost: "$11", description: "Keeps flies away." },
        { name: "Geraniums", image: "https://cdn.pixabay.com/photo/2017/07/20/15/22/geranium-2522204_1270.jpg", cost: "$16", description: "Pest deterrent." },
        { name: "Flossflower", image: "https://cdn.pixabay.com/photo/2014/09/27/15/13/ageratum-464221_1270.jpg", cost: "$13", description: "Deters pests." }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prevState => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <div className="navbar">
        <h2>Paradise Nursery</h2>
        <div className="nav-links">
          <span onClick={() => setShowCart(false)}>Plants</span>
          <span onClick={() => setShowCart(true)}>
            🛒 Cart ({totalCartCount})
          </span>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2>{category.category}</h2>
              <div className="plant-list">
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="plant-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.cost}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
