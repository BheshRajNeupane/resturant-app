import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import  HeroPizza from '@/assets/hero_pizza.png'
import { Button } from './ui/button'


const AvailableMenu = () => {
  return (
    <div className="md:p-4">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available Menus
      </h1>
  <div className='grid md:grid-cols-3 space-y-4 md:space-y-0'>
  <Card className='rounded-lg shadow-lg mx-auto overflow-hidden max-w-xs'>
    <img src={HeroPizza} alt="" 
    className='object-cover w-full h-40'/>

<CardContent className='p-4'>
    <h2 className='text-xl font-semibold'> Tanduri Biryani</h2>
    <p className='text-sm text-gray-600 dark:text mt-2'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ea voluptate dolorum atque
         rerum distinctio cum quo deserunt sapiente iste eligendi aliquid perferendis minus, natus fugiat ex veniam quos sed?</p>
         <h3 className='text-lg font-semibold mt-4'>
            <p>Price : <span className='text-[#D19254]'> Rs80</span></p>
         </h3>
</CardContent>

<CardFooter className='p-4'> 
  <Button className='w-full bg-orange hover:bg-hoverOrange'>
    Add to Cart
  </Button>
</CardFooter>

  </Card>
  </div> 
  </div>
)
}

export default AvailableMenu