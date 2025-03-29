import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "FAQ | ShopCatalog",
  description: "Frequently asked questions about our products and services",
}

export default function FAQPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8">Find answers to common questions about our products and services</p>

        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Orders & Shipping</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days within the continental United States. Expedited
                  shipping options are available at checkout for faster delivery. International shipping times vary by
                  location, usually taking 7-14 business days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer free standard shipping on all orders over $50 within the United States. Orders under $50
                  have a flat shipping rate of $5.99.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I modify or cancel my order after it's been placed?</AccordionTrigger>
                <AccordionContent>
                  We process orders quickly to ensure fast shipping. If you need to modify or cancel your order, please
                  contact our customer service team immediately. We'll do our best to accommodate your request, but we
                  cannot guarantee changes once the order has entered the fulfillment process.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a shipping confirmation email with tracking information. You can
                  also track your order by logging into your account and viewing your order history.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Returns & Refunds</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-5">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy on most items. If you're not completely satisfied with your purchase,
                  you can return it within 30 days of delivery for a full refund or exchange. Items must be in their
                  original condition with all tags and packaging intact.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I return an item?</AccordionTrigger>
                <AccordionContent>
                  To initiate a return, log into your account, go to your order history, and select the order containing
                  the item you wish to return. Follow the prompts to generate a return label and instructions. If you
                  have any issues, please contact our customer service team for assistance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                <AccordionContent>
                  Once we receive your return, we'll inspect the item and process your refund within 5-7 business days.
                  Refunds will be issued to the original payment method. Please note that it may take an additional 3-5
                  business days for the refund to appear on your account, depending on your financial institution.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Products & Inventory</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-8">
                <AccordionTrigger>Are your products authentic?</AccordionTrigger>
                <AccordionContent>
                  Yes, all products sold on ShopCatalog are 100% authentic. We source our products directly from
                  manufacturers or authorized distributors to ensure quality and authenticity.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger>What if an item I want is out of stock?</AccordionTrigger>
                <AccordionContent>
                  You can sign up for email notifications on product pages for out-of-stock items. We'll notify you as
                  soon as the item is back in stock. Popular items are restocked regularly, but some limited-edition
                  products may not be restocked.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger>Do you offer product warranties?</AccordionTrigger>
                <AccordionContent>
                  Many of our products come with manufacturer warranties. Warranty information is listed on the product
                  page when applicable. For warranty claims, please contact the manufacturer directly using the
                  information provided with your product.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Account & Payment</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-11">
                <AccordionTrigger>Do I need to create an account to make a purchase?</AccordionTrigger>
                <AccordionContent>
                  While we recommend creating an account for the best shopping experience, we also offer a guest
                  checkout option. Creating an account allows you to track orders, save your shipping information, and
                  access your order history.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay,
                  and Google Pay. All transactions are securely processed and encrypted to protect your information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13">
                <AccordionTrigger>Is my payment information secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take security seriously. Our website uses SSL encryption to protect your personal and payment
                  information. We do not store your full credit card details on our servers. All payment processing is
                  handled by trusted third-party payment processors that comply with the highest security standards.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <div className="bg-muted p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer service team is here to help. Contact us and we'll get back to you as soon as possible.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

