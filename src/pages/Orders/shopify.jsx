import React, { useState, useEffect } from 'react';

const ShopifyProductWithSubscription = () => {
  const [shopifyClient, setShopifyClient] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [sellingPlans, setSellingPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Load Shopify SDK
  useEffect(() => {
    const loadShopifyScript = () => {
      const script = document.createElement('script');
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
        initializeShopify();
      };
      document.body.appendChild(script);
    };
    
    const initializeShopify = () => {
      if (window.ShopifyBuy) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'x60ee1-t2.myshopify.com',
          storefrontAccessToken: 'c6e0a0455eca13b69f9392742e942c23'
        });
        setShopifyClient(client);
        
        // Load product details including selling plans
        loadProductDetails(client);
      }
    };
    
    if (!isScriptLoaded) {
      loadShopifyScript();
    }
  }, [isScriptLoaded]);
  
  // Load product details and selling plans
  const loadProductDetails = async (client) => {
    try {
      // Replace with your product ID
      // When adding items to cart with subscription option
const lineItem = {
  variantId: selectedVariant.id,
  quantity: parseInt(quantity)
};

// Add selling plan ID if subscription is selected
if (isSubscription) {
  lineItem.sellingPlanId = 'gid://shopify/SellingPlan/1901822193';
}
      let productId=lineItem.sellingPlanId;
      // Query including selling plans
      const product = await client.product.fetch(productId);
      setSelectedProduct(product);
      
      if (product.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
        
        // Get selling plans if available
        if (product.sellingPlanGroups && product.sellingPlanGroups.length > 0) {
          const plans = [];
          product.sellingPlanGroups.forEach(group => {
            if (group.sellingPlans && group.sellingPlans.length > 0) {
              group.sellingPlans.forEach(plan => {
                plans.push({
                  id: plan.id,
                  name: plan.name,
                  description: plan.description
                });
              });
            }
          });
          setSellingPlans(plans);
          if (plans.length > 0) {
            setSelectedPlan(plans[0].id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  
  // Handle checkout
  const handleCheckout = async () => {
    if (!shopifyClient || !selectedVariant) return;
    
    try {
      // Create checkout
      const checkout = await shopifyClient.checkout.create();
      
      // Prepare line item
      const lineItem = {
        variantId: selectedVariant.id,
        quantity: parseInt(quantity)
      };
      
      // Add selling plan ID if subscription is selected
      if (isSubscription && selectedPlan) {
        lineItem.sellingPlanId = selectedPlan;
      }
      
      // Add item to checkout
      const updatedCheckout = await shopifyClient.checkout.addLineItems(
        checkout.id,
        [lineItem]
      );
      
      // Redirect to checkout
      window.location.href = updatedCheckout.webUrl;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };
  
  if (!selectedProduct || !selectedVariant) {
    return <div>Loading product...</div>;
  }
  
  return (
    <div className="product-container">
      <h2>{selectedProduct.title}</h2>
      <div className="product-details">
        {selectedProduct.images && selectedProduct.images.length > 0 && (
          <img 
            src={selectedProduct.images[0].src} 
            alt={selectedProduct.title} 
            className="product-image" 
          />
        )}
        
        <div className="product-info">
          <p className="price">${selectedVariant.price}</p>
          
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
          
          {sellingPlans.length > 0 && (
            <div className="subscription-options">
              <div className="purchase-type">
                <label>
                  <input
                    type="radio"
                    checked={!isSubscription}
                    onChange={() => setIsSubscription(false)}
                  />
                  One-time purchase
                </label>
                
                <label>
                  <input
                    type="radio"
                    checked={isSubscription}
                    onChange={() => setIsSubscription(true)}
                  />
                  Subscribe & save
                </label>
              </div>
              
              {isSubscription && (
                <div className="subscription-frequency">
                  <label htmlFor="sellingPlan">Delivery frequency:</label>
                  <select
                    id="sellingPlan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    {sellingPlans.map(plan => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          
          <button 
            className="add-to-cart-button" 
            onClick={handleCheckout}
          >
            {isSubscription ? 'Subscribe now' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopifyProductWithSubscription;