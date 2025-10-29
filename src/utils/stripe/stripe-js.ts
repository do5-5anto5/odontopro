import { loadStripe } from './../../../node_modules/@stripe/stripe-js/dist/pure.d';


export async function getStripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

    return stripeJs
}