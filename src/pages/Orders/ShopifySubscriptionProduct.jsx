import React, { useState, useEffect } from 'react';
import './s3.css'

const ShopifySubscriptionProduct = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [sellingPlans, setSellingPlans] = useState([]);
  const [selectedSellingPlan, setSelectedSellingPlan] = useState(null);

  useEffect(() => {
    // Load the Shopify client and fetch product data
    loadShopifyClient();
  }, []);

  const loadShopifyClient = async () => {
    try {
      // Load the Shopify SDK script
      const script = document.createElement('script');
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      
      script.onload = () => {
        // Initialize client
        const client = window.ShopifyBuy.buildClient({
          domain: 'x60ee1-t2.myshopify.com',
          storefrontAccessToken: 'c6e0a0455eca13b69f9392742e942c23',
        });
        
        // Fetch product data
        fetchProductData(client);
      };
      
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error loading Shopify client:', error);
      setLoading(false);
    }
  };

  const fetchProductData = async (client) => {
    try {
      // Replace with your product ID
      const productId = 'gid://shopify/Product/8786284118257';
      
      const product = await client.product.fetch(productId);
      console.log('Product data:', product);
      setProduct(product);
      
      // Set default variant
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }
      
      // Check for selling plans (subscriptions)
      if (product.sellingPlanGroups && product.sellingPlanGroups.length > 0) {
        const plans = [];
        product.sellingPlanGroups.forEach(group => {
          if (group.sellingPlans && group.sellingPlans.length > 0) {
            group.sellingPlans.forEach(plan => {
              plans.push({
                id: plan.id,
                name: plan.name,
                description: plan.description || '',
              });
            });
          }
        });
        
        setSellingPlans(plans);
        
        // Set default selling plan if available
        if (plans.length > 0) {
          setSelectedSellingPlan(plans[0].id);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    try {
      const client = window.ShopifyBuy.buildClient({
        domain: 'x60ee1-t2.myshopify.com',
        storefrontAccessToken: 'c6e0a0455eca13b69f9392742e942c23',
      });
      
      // Create checkout
      const checkout = await client.checkout.create();
      
      // Prepare line item
      const lineItemsToAdd = [
        {
          variantId: selectedVariant.id,
          quantity: parseInt(quantity, 10),
          // Add selling plan ID if subscription is selected
          ...(isSubscription && selectedSellingPlan && { sellingPlanId: selectedSellingPlan })
        }
      ];
      
      // Add items to checkout
      const updatedCheckout = await client.checkout.addLineItems(
        checkout.id, 
        lineItemsToAdd
      );
      
      // Redirect to checkout
      window.location.href = updatedCheckout.webUrl;
      
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-container">
      <h2>{product.title}</h2>
      
      {/* Product Image */}
      {product.images && product.images.length > 0 && (
        <div className="product-image">
          <img 
            src={product.images[0].src} 
            alt={product.title} 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      )}
      
      {/* Product Details */}
      <div className="product-details">
        <p className="product-price">
          ${selectedVariant ? selectedVariant.price : 'N/A'}
        </p>
        
        {/* Quantity Selector */}
        <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        
        {/* Subscription Options - Only show if selling plans are available */}
        {sellingPlans.length > 0 && (
          <div className="subscription-options">
            <div className="purchase-options">
              <label>
                <input
                  type="radio"
                  name="purchaseType"
                  checked={!isSubscription}
                  onChange={() => setIsSubscription(false)}
                />
                One-time purchase
              </label>
              
              <label>
                <input
                  type="radio"
                  name="purchaseType"
                  checked={isSubscription}
                  onChange={() => setIsSubscription(true)}
                />
                Subscribe & save
              </label>
            </div>
            
            {/* Delivery Frequency - Only show if subscription is selected */}
            {isSubscription && (
              <div className="selling-plan-selector">
                <label htmlFor="sellingPlan">Delivery frequency:</label>
                <select
                  id="sellingPlan"
                  value={selectedSellingPlan || ''}
                  onChange={(e) => setSelectedSellingPlan(e.target.value)}
                >
                  {sellingPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
        
        {/* Add to Cart Button */}
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          {isSubscription ? 'Subscribe Now' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ShopifySubscriptionProduct;