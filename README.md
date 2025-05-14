# **ShopEasy E-Commerce Website Documentation**

## **1. Overview**
**ShopEasy** is a fully responsive e-commerce website built with **HTML5, CSS3, and JavaScript**. It features:
- **Product listings** with filtering and sorting
- **Product detail pages**
- **Shopping cart** with local storage persistence
- **Responsive design** (works on mobile, tablet, and desktop)
- **Modern UI** with animations and interactive elements

### **Deployment**
- **Netlify/Vercel:** ([https://shopeasy.netlify.app](https://incomparable-torte-40aea1.netlify.app/))  

---

## **2. Project Structure**
```
ecommerce-website/
├── index.html            # Homepage
├── products.html         # Product listings
├── product-detail.html   # Single product view
├── cart.html            # Shopping cart
├── css/
│   ├── style.css        # Main styles
│   └── responsive.css   # Mobile styles
├── js/
│   ├── main.js          # Core functionality
│   ├── cart.js          # Cart logic
│   └── products.js      # Product data
├── images/              # Product images
└── README.md            # Project documentation
```

---

## **3. Features & Functionality**

### ** Homepage (`index.html`)**
- **Hero banner** with promotional message
- **Featured categories** (Electronics, Fashion, Home & Garden)
- **Featured products** (loaded from `products.js`)
- **Newsletter subscription** form

### ** Products Page (`products.html`)**
- **Product filtering** by category
- **Sorting** (Price Low-High, Rating, Name)
- **"Add to Cart"** button for each product
- **"View Details"** link to `product-detail.html`

### ** Product Detail Page (`product-detail.html`)**
- **Product image, name, price, rating, description**
- **Quantity selector** (+/- buttons)
- **"Add to Cart"** button
- **Related products** section

### ** Shopping Cart (`cart.html`)**
- **List of cart items** with images, prices, and quantities
- **Quantity adjustment** (increase/decrease)
- **Remove item** option
- **Order summary** (Subtotal, Shipping, Total)
- **"Proceed to Checkout"** & **"Continue Shopping"** buttons

---

## **4. JavaScript Functions & Logic**

### **🛒 `cart.js` - Shopping Cart Management**
| Function | Description |
|----------|------------|
| `addToCart(productId, quantity)` | Adds a product to the cart (or updates quantity) |
| `removeFromCart(productId)` | Removes an item from the cart |
| `updateCartItem(productId, newQuantity)` | Updates item quantity |
| `clearCart()` | Empties the cart |
| `getCartCount()` | Returns total number of items |
| `getCartTotal()` | Calculates cart subtotal |
| `saveCart()` | Saves cart to `localStorage` |
| `updateCartCount()` | Updates cart icon badge |
| `displayCartItems()` | Renders cart items in `cart.html` |
| `updateCartSummary()` | Updates order summary |

### ** `main.js` - Core Functionality**
- **Mobile menu toggle** (hamburger menu)
- **Loads featured products** on homepage
- **Rating stars generator** (`getRatingStars(rating)`)
- **Notification system** (e.g., "Item added to cart")

### ** `products.js` - Product Data**
- Stores an array of products with:
  - `id`, `name`, `price`, `image`, `rating`, `category`, `description`

---

## **5. Responsive Design**
- **Mobile-first approach** (optimized for small screens)
- **Flexbox & CSS Grid** for layouts
- **Media queries** in `responsive.css` for:
  - **Mobile (< 768px)**
  - **Tablet (768px - 992px)**
  - **Desktop (> 992px)**

---

## **6. Deployment Guide**
### **Option 1: GitHub Pages**
1. **Create a GitHub repo** named `ecommerce-website`.
2. **Upload all files** (`index.html`, `css/`, `js/`, `images/`).
3. **Go to Settings → Pages**.
4. **Select `main` branch** and click **Save**.
5. **Your site will deploy** at:  
   `https://<your-username>.github.io/ecommerce-website`

### **Option 2: Netlify/Vercel**
1. **Sign up** at [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. **Drag & drop** your project folder.
3. **Auto-deployment** will start.
4. **Your site will be live** at:  
   `https://your-site-name.netlify.app`

---

## **7. Future Enhancements**
 **User authentication** (login/signup)  
 **Checkout & payment integration** (Stripe/PayPal)  
 **Search functionality**  
 **Product reviews & ratings**  
**Backend API integration** (Node.js/Firebase)  



## **8. How to Contribute**
1. **Fork the repository** on GitHub.
2. **Create a new branch** (`git checkout -b feature/new-feature`).
3. **Commit changes** (`git commit -m "Add new feature"`).
4. **Push to branch** (`git push origin feature/new-feature`).
5. **Open a Pull Request**.



