import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/util/db'
import Stripe from 'stripe'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		//Add another provider
	],
	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
				apiVersion: '2022-11-15',
			})
			//Let's create a stripe customer

			const customer = await stripe.customers.create({
				email: user.email || undefined,
				name: user.name || undefined,
			})
			//Also update our prisma user with the stripecustomerid

			await db.user.update({
				where: { id: user.id },
				data: { stripeCustomerId: customer.id },
			})
		},
	},
	callbacks: {
		async session({ session, token, user }) {
			session.user = user
			return session
		},
	},
}

export default NextAuth(authOptions)
