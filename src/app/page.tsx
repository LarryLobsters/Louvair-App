import Product from '@/components/Product'
import getProducts from '@/util/getProducts'
import Hero from '@/public/louvair4.png'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function Home() {
	const products = await getProducts()

	return (
		<>
			<div className='py-3 mx-auto text-center flex flex-col items-center max-w-3xl'>
				<div className='w-screen'>
					<div className='bg-fixed inset-0 object-cover w-screen'>
						<AspectRatio ratio={16 / 9}>
							<Image
								src={Hero}
								alt='Hero Image'
								className='rounded-sm object-cover '
								priority
							/>
							<div className='absolute top-20 left-0 mt-6 w-full z-10'>
								<h1 className='text-4xl font-light tracking-wide text-zinc-700 '>
									Aromatic Bliss
									<br />
									<span className='text-amber-800 font-light uppercase text-lg pt-6'>
										Air Ambience
									</span>
								</h1>
							</div>
						</AspectRatio>
					</div>
				</div>
				<div className='my-12'>
					<p className='text-base max-w-prose font-thin text-zinc-900 text-muted-foreground relative'>
						L&apos;ouvair was founded in 2018 and, early-on, it committed to
						reinterpret ancient techniques of fine craftsmanship to create
						unexpected air fume for your favorite interior. Each creation
						carries the legacy of centuries of craftsmanship.
					</p>
					<div className='flex justify-center gap-6 mt-6'>
						<Link href='/products' className={buttonVariants()}>
							Browse Trending
						</Link>
						<Link
							href='/sign-in'
							className={cn(buttonVariants({ size: 'lg' }))}
						>
							Get Started
						</Link>
					</div>
				</div>
			</div>
			<main className='grid grid-cols-fluid gap-12'>
				{products.map((product) => (
					<Product {...product} key={product.id} />
				))}
			</main>
		</>
	)
}
