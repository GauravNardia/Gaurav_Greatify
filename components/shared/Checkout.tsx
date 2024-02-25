"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { checkoutCredits } from "@/lib/actions/transaction.action";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    if (!isSubmitting) {
      setIsSubmitting(true); // Prevent multiple submissions
      try {
        await checkoutCredits({ plan, amount, credits, buyerId });
        // Handle success
        toast({
          title: "Order placed!",
          description: "You will receive an email confirmation",
          duration: 5000,
          className: "success-toast",
        });
      } catch (error) {
        // Handle error
        console.error("Error during checkout:", error);
        toast({
          title: "Error during checkout",
          description: "Please try again later",
          duration: 5000,
          className: "error-toast",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-gradient bg-cover"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Buy Credit'}
        </Button>
      </section>
    </form>
  );
};

export default Checkout;