'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '../../../../store'
import { AddCartType } from '@/types/AddCartType'
import { useState } from 'react'

export default function AddCart({
	name,
	id,
	image,
	unit_amount,

	quantity,
}: AddCartType) {
	const cartStore = useCartStore()
	const [added, setAdded] = useState(false)

	const handleAddToCart = () => {
		cartStore.addProduct({ id, name, unit_amount, quantity, image })
		setAdded(true)
		setTimeout(() => {
			setAdded(false)
		}, 500)
	}

	return (
		<>
			<Button
				onClick={handleAddToCart}
				disabled={added}
				className='my-4  w-full bg-zinc-600/90 text-white '
			>
				{!added && <span>Add to cart</span>}
				{added && <span>Adding to cart 😄</span>}
			</Button>
		</>
	)
}
