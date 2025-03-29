import { Truck, RotateCcw, Clock, Globe, CreditCard } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Shipping & Returns | ShopCatalog",
  description: "Information about our shipping and return policies",
}

export default function ShippingPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Shipping & Returns</h1>

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid gap-6">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Free Standard Shipping</h3>
                  <p className="text-muted-foreground">
                    Free standard shipping on all orders over $50. Orders under $50 have a flat shipping rate of $5.99.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Standard shipping typically takes 3-5 business days, depending on your location.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Expedited Shipping</h3>
                  <p className="text-muted-foreground">
                    Need your order faster? Choose expedited shipping at checkout for delivery within 2 business days.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Expedited shipping costs $12.99 for orders under $100, and $9.99 for orders over $100.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">International Shipping</h3>
                  <p className="text-muted-foreground">
                    We ship to over 100 countries worldwide. International shipping rates and delivery times vary by
                    location.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Please note that international orders may be subject to import duties and taxes, which are the
                    responsibility of the recipient.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            <div className="grid gap-6">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">30-Day Returns</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day return policy on most items. If you're not completely satisfied with your
                    purchase, you can return it within 30 days of delivery for a full refund or exchange.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Items must be in their original condition with all tags and packaging intact.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Refund Process</h3>
                  <p className="text-muted-foreground">
                    Once we receive your return, we'll inspect the item and process your refund within 5-7 business
                    days. Refunds will be issued to the original payment method.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Shipping costs are non-refundable, and return shipping costs are the responsibility of the customer
                    unless the return is due to our error.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can
                  also track your order by logging into your account and viewing your order history.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Do you ship to PO boxes?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to PO boxes for standard shipping. However, expedited shipping may require a physical
                  address for delivery.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I initiate a return?</AccordionTrigger>
                <AccordionContent>
                  To initiate a return, log into your account, go to your order history, and select the order containing
                  the item you wish to return. Follow the prompts to generate a return label and instructions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Are there any items that cannot be returned?</AccordionTrigger>
                <AccordionContent>
                  For hygiene reasons, certain items like earphones, undergarments, and personal care products cannot be
                  returned once opened or used. Additionally, customized or personalized items are not eligible for
                  return unless there's a manufacturing defect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
                <AccordionContent>
                  If your item arrives damaged, please contact our customer service team within 48 hours of delivery.
                  Please include photos of the damaged item and packaging to help us process your claim quickly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our shipping or return policies, please don't hesitate to contact our
              customer service team:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                Email:{" "}
                <a href="mailto:support@shopcatalog.com" className="text-primary hover:underline">
                  support@shopcatalog.com
                </a>
              </li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Monday - Friday, 9am - 5pm PST</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

