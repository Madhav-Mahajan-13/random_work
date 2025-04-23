import React, { useEffect } from 'react';

const ShopifyBuyButton = () => {
  useEffect(() => {
    // Load the Shopify Buy Button script
    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
      script.onload = initShopifyBuy;
      document.body.appendChild(script);
    };

    // Initialize Shopify Buy
    const initShopifyBuy = () => {
      if (window.ShopifyBuy) {
        const client = window.ShopifyBuy.buildClient({
          domain: 'x60ee1-t2.myshopify.com',
          storefrontAccessToken: 'c6e0a0455eca13b69f9392742e942c23',
        });

        window.ShopifyBuy.UI.onReady(client).then(ui => {
          ui.createComponent('collection', {
            id: '447492423921',
            node: document.getElementById('shopify-buy-button-container'),
            moneyFormat: 'Rs.%20%7B%7Bamount%7D%7D',
            options: {
              product: {
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "calc(25% - 20px)",
                      "margin-left": "20px",
                      "margin-bottom": "50px",
                      "width": "calc(25% - 20px)"
                    },
                    "img": {
                      "height": "calc(100% - 15px)",
                      "position": "absolute",
                      "left": "0",
                      "right": "0",
                      "top": "0"
                    },
                    "imgWrapper": {
                      "padding-top": "calc(75% + 15px)",
                      "position": "relative",
                      "height": "0"
                    }
                  },
                  title: {
                    color: "#282626"
                  },
                  button: {
                    "border-radius": "14px"
                  }
                },
                text: {
                  button: "Add to cart"
                }
              },
              productSet: {
                styles: {
                  products: {
                    "@media (min-width: 601px)": {
                      "margin-left": "-20px"
                    }
                  }
                }
              },
              modalProduct: {
                contents: {
                  img: false,
                  imgWithCarousel: true,
                  button: false,
                  buttonWithQuantity: true
                },
                styles: {
                  product: {
                    "@media (min-width: 601px)": {
                      "max-width": "100%",
                      "margin-left": "0px",
                      "margin-bottom": "0px"
                    }
                  },
                  button: {
                    "border-radius": "14px"
                  },
                  title: {
                    "font-family": "Helvetica Neue, sans-serif",
                    "font-weight": "bold",
                    "font-size": "26px",
                    "color": "#4c4c4c"
                  }
                },
                text: {
                  button: "Add to cart"
                }
              },
              option: {},
              cart: {
                styles: {
                  button: {
                    "border-radius": "14px"
                  }
                },
                text: {
                  total: "Subtotal",
                  button: "Checkout"
                }
              },
              toggle: {}
            }
          });
        });
      }
    };

    // If Shopify Buy is already loaded
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        initShopifyBuy();
      } else {
        loadScript();
      }
    } else {
      loadScript();
    }

    // Cleanup
    return () => {
      // Remove script on component unmount if needed
      const scriptTag = document.querySelector('script[src="https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js"]');
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  return (
    <div>
      <h2>Our Products</h2>
      <div id="shopify-buy-button-container"></div>
    </div>
  );
};

export default ShopifyBuyButton;