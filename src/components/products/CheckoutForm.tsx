import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CheckoutFormProps {
  onSubmit: (userDetails: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  }) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const CheckoutForm = ({ onSubmit, onCancel, darkMode }: CheckoutFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <h2
        className={cn(
          "font-serif text-2xl mb-6",
          darkMode ? "text-homeo-darkText" : "text-homeo-dark"
        )}
      >
        Checkout Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="firstName"
            className={darkMode ? "text-homeo-darkText" : "text-homeo-dark"}
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={darkMode ? "bg-homeo-darkBg text-homeo-darkText" : ""}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className={darkMode ? "text-homeo-darkText" : "text-homeo-dark"}
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={darkMode ? "bg-homeo-darkBg text-homeo-darkText" : ""}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="phone"
            className={darkMode ? "text-homeo-darkText" : "text-homeo-dark"}
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={darkMode ? "bg-homeo-darkBg text-homeo-darkText" : ""}
            required
          />
        </div>
        <div>
          <Label
            htmlFor="address"
            className={darkMode ? "text-homeo-darkText" : "text-homeo-dark"}
          >
            Detailed Address
          </Label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={cn(
              "w-full p-2 border rounded",
              darkMode
                ? "bg-homeo-darkBg text-homeo-darkText border-homeo-darkBorder"
                : "border-neutral-200"
            )}
            rows={4}
            required
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={cn(
              "w-full",
              darkMode
                ? "bg-homeo-darkAccent hover:bg-homeo-primary text-homeo-darkBg"
                : "bg-homeo-primary hover:bg-homeo-secondary text-white"
            )}
          >
            Proceed to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;