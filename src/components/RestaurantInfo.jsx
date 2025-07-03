import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card"
import { Dot } from 'lucide-react'

const RestaurantInfo = ({restaurant}) => {
  return (
    <>
     <Card className="border-sla bg-gray-300">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.state}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex" key={index}>
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
    </>
  )
}

export default RestaurantInfo