import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface CartProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  darkMode: boolean;
}

const Cart = ({ cartOpen, setCartOpen, darkMode }: CartProps) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useCartStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  });
  const [isCheckout, setIsCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = getCartTotal();
  const cartItemCount = getCartItemCount();

  // Function to dynamically load Razorpay SDK
  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if ((window as any).Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      toast.info('Item removed from cart');
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic form validation
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
        toast.error('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      // Phone validation - react-phone-input-2 gives us the number without the + prefix
      // We need to ensure it's properly formatted for the backend
      const phoneWithPlus = formData.phone.startsWith('+') ? formData.phone : `+${formData.phone}`;

      if (cartItems.length === 0) {
        toast.error('Cart is empty');
        setIsLoading(false);
        return;
      }

      // Validate cartItems
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        if (!item.id || typeof item.id !== 'string') {
          console.error(`Invalid cart item at index ${i}:`, item);
          toast.error(`Invalid item in cart at index ${i}: missing or invalid id`);
          setIsLoading(false);
          return;
        }
      }

      const receipt = `order_${Date.now()}`;
      const requestBody = {
        amount: cartTotal,
        currency: 'INR',
        receipt,
        notes: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: phoneWithPlus,
          address: formData.address,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log('Sending create-order request:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }

      const { data } = await response.json();
      const { order, key_id } = data;

      // Load Razorpay SDK before initializing checkout
      await loadRazorpayScript();

      // Initialize Razorpay checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'Homeo Handmade Soaps',
        description: 'Order Payment',
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              toast.success('Payment successful!');
              setCartOpen(false);
              setIsCheckout(false);
              setFormData({ firstName: '', lastName: '', phone: '', address: '' });
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Error verifying payment');
            console.error('Payment verification error:', error);
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          contact: formData.phone.replace(/^\+/, ''), // Remove '+' for Razorpay prefill
        },
        theme: {
          color: darkMode ? '#a78bfa' : '#f472b6',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error((error as Error).message || 'Failed to process checkout');
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'fixed top-0 right-0 h-full w-full sm:w-96 transition-transform duration-300 z-50 overflow-y-auto',
        darkMode ? 'bg-homeo-darkBg text-homeo-darkText' : 'bg-white text-homeo-dark',
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Your Cart</h2>
          <Button variant="ghost" onClick={() => setCartOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {cartItemCount === 0 ? (
          <p className={darkMode ? 'text-homeo-darkMuted' : 'text-neutral-500'}>Your cart is empty</p>
        ) : (
          <>
            {isCheckout ? (
              <form onSubmit={handleCheckout} className="space-y-4">
                <h3 className="text-lg font-medium">Checkout</h3>
                <Input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className={cn(
                    darkMode ? 'bg-homeo-darkBg border-homeo-darkBorder' : 'bg-white border-homeo-softPeach'
                  )}
                />
                <Input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className={cn(
                    darkMode ? 'bg-homeo-darkBg border-homeo-darkBorder' : 'bg-white border-homeo-softPeach'
                  )}
                />
                <div className="phone-input-container">
                  <PhoneInput
                    country={'in'}
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    inputProps={{
                      required: true,
                      placeholder: 'Phone Number',
                      className: cn(
                        'w-full px-3 py-2 border rounded-md',
                        darkMode ? 'bg-homeo-darkBg border-homeo-darkBorder text-homeo-darkText' : 'bg-white border-homeo-softPeach text-homeo-dark'
                      ),
                    }}
                    containerClass={cn(
                      'w-full',
                      darkMode ? 'phone-input-dark' : 'phone-input-light'
                    )}
                    countryCodeEditable={true}
                  />
                </div>
                <Textarea
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className={cn(
                    darkMode ? 'bg-homeo-darkBg border-homeo-darkBorder' : 'bg-white border-homeo-softPeach'
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full',
                    darkMode
                      ? 'bg-homeo-tertiary text-homeo-darkText hover:bg-homeo-tertiary'
                      : 'bg-homeo-primary text-white hover:bg-homeo-secondary'
                  )}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCheckout(false)}
                  className={cn(
                    'w-full',
                    darkMode
                      ? 'border-homeo-darkBorder text-homeo-darkText hover:bg-homeo-darkBg'
                      : 'border-homeo-softPeach text-homeo-primary hover:bg-homeo-softPurple'
                  )}
                >
                  Back to Cart
                </Button>
              </form>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-sm">₹ {item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className={cn(
                          darkMode ? 'border-homeo-darkBorder' : 'border-homeo-softPeach'
                        )}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className={cn(
                          darkMode ? 'border-homeo-darkBorder' : 'border-homeo-softPeach'
                        )}
                      >
                        <X className="h-4 w-4 rotate-45" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <p className="text-lg font-medium">Total: ₹ {cartTotal.toFixed(2)}</p>
                  <Button
                    onClick={() => setIsCheckout(true)}
                    className={cn(
                      'w-full mt-4',
                      darkMode
                        ? 'bg-homeo-tertiary text-homeo-darkText hover:bg-homeo-tertiary'
                        : 'bg-homeo-primary text-white hover:bg-homeo-secondary'
                    )}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;