import React, { useState } from 'react';
import '../styles/components/Menu.css';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { addToCart, openCart } = useCart();

  const dishes = [
    {
      id: 1,
      category: 'breakfast',
      image: '/assets/images/eggs.jpg',
      title: 'Eggs',
      description: 'Two eggs(fried, scrambled, tortilla or scrambled with tomatoes and onions), arepa, bread, cheese, and hot chocolate',
      price: '$12'
    },
    {
      id: 2,
      category: 'breakfast',
      image: '/assets/images/eggs-rice-beans.webp',
      title: 'Heated Beans',
      description: 'Rice with red beans, arepa, fried egg, bread, cheese, and hot chocolate',
      price: '$12'
    },
    {
      id: 3,
      category: 'breakfast',
      image: '/assets/images/beef rib broth.jpg',
      title: 'Beef Rib Broth',
      description: 'Beef rib broth, arepa, bread, cheese, and hot chocolate',
      price: '$12'
    },
    {
      id: 4,
      category: 'breakfast',
      image: '/assets/images/tamal.jpeg',
      title: 'Tamal from Huila',
      description: 'Tamal, arepa, bread, cheese and chocolate',
      price: '$12'
    },
    {
      id: 5,
      category: 'lunch',
      image: '/assets/images/bandeja paisa.png',
      title: 'Paisa platter',
      description: 'Pulled beef, chorizo (Spanish sausage), pork rind, fried egg, rice, read beans, arepa, avocado, and ripe plantain',
      price: '$17'
    },
    {
      id: 6,
      category: 'lunch',
      image: '/assets/images/flank.jpg',
      title: 'Flank Steak',
      description: 'Flank steak, rice, cooked cassava, and avocado',
      price: '$17'
    },
    {
      id: 7,
      category: 'lunch',
      image: '/assets/images/hen.gif',
      title: 'Hen Stew',
      description: 'Hen, broth, rice, corn cob, potato, cooked cassava, ripe plantain, and avocado',
      price: '$17'
    },
    {
      id: 8,
      category: 'lunch',
      image: '/assets/images/ajiaco.webp',
      title: 'Ajiaco',
      description: 'Chicken, broth, rice, corn cob, milk cream, capers, avocado, and banana',
      price: '$17'
    },
    {
      id: 9,
      category: 'lunch',
      image: '/assets/images/chicken-with-rice.webp',
      title: 'Chicken with Rice',
      description: 'Chicken with rice and fries',
      price: '$17'
    },
    {
      id: 10,
      category: 'lunch',
      image: '/assets/images/grilled.jpg',
      title: 'Grilled Meat',
      description: 'Beef or chicken or pork, fries, and letucce salad',
      price: '$17'
    },
    {
      id: 11,
      category: 'lunch',
      image: '/assets/images/tilapia.webp',
      title: 'Fried Tilapia',
      description: 'Fried tilapia, lettuce salad, rice, and fried green plantain',
      price: '$17'
    },
    {
      id: 12,
      category: 'lunch',
      image: '/assets/images/catfish.jpg',
      title: 'Catfish with Sauce',
      description: 'Catfish with sauce, rice, cooked cassava, and avocado',
      price: '$17'
    },
    {
      id: 13,
      category: 'regular-lunch',
      image: '/assets/images/regular.jpg',
      title: 'Regular Lunch',
      description: 'Rice, red beans, cooked cassava or potato, beef with veggies or stewed chicken or sweet and sour pork',
      price: '$12'
    },
    {
      id: 14,
      category: 'regular-lunch',
      image: '/assets/images/spaghetti.jpg',
      title: 'Spaghetti',
      description: 'Meat or chicken spaghetti, and fries',
      price: '$15'
    }
  ];

  const filteredDishes = activeFilter === 'all'
    ? dishes
    : dishes.filter(dish => dish.category === activeFilter);

  const handleAddToCart = (dish) => {
    addToCart(dish);
    openCart();
  };

  return (
    <section className="menu container" id="menu">
      <h2 className="dishes-text">Menu</h2>
      <div className="buttons-menu">
        <button className={`btn blue-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Dishes</button>
        <button className={`btn blue-btn ${activeFilter === 'breakfast' ? 'active' : ''}`} onClick={() => setActiveFilter('breakfast')}>Breakfast</button>
        <button className={`btn blue-btn ${activeFilter === 'lunch' ? 'active' : ''}`} onClick={() => setActiveFilter('lunch')}>Lunch</button>
        <button className={`btn blue-btn ${activeFilter === 'regular-lunch' ? 'active' : ''}`} onClick={() => setActiveFilter('regular-lunch')}>Regular Lunch</button>
      </div>
      <div className="dishes">
        {filteredDishes.map(dish => (
          <div className="dish" key={dish.id} data-dish={dish.category}>
            <img src={dish.image} alt={dish.title} loading="lazy" />
            <h2>{dish.title}</h2>
            <div className='descriptionPrice'>
              <div className="price">
                <p>{dish.price}</p>
                <button 
  aria-label={`Add ${dish.title} to cart`} 
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(dish);
  }}
>
  <i className="fa-solid fa-basket-shopping"></i>
</button>

              </div>
              <p>{dish.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
