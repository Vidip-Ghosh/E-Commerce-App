const express = require("express")
const app = express()
const cors = require("cors")
const stripe = require("stripe")("sk_test_51LCnRQSJSsOC2eKtoNUvTgtIxfqXuwuQxIYKXR4zmUMbIOzaJ7itzGMBhEeOwq29P9y5vEew0T5XmwbDealDrEst00APkwYqCh")

app.use(express.json())
app.use(cors())

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({ error: "Products array is empty or undefined." });
    }

    const lineItems = products.map((prod) => {
        console.log("Hello from backend: ", prod.product);
        const productName = prod.product.title || "Default Product Name";
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: productName,
                    description: prod.product.description,
                    images: [prod.product.image],
                },
                unit_amount: prod.product.price * 100,
            },
            quantity: 1,
        };
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Error creating checkout session." });
    }
});



app.listen(3000,()=>{
    console.log("Server start");
})