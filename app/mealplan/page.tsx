'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [meals,setMeals]=useState([])

  useEffect(()=>{
    console.log(meals)

  },[meals])
const [data,setData]=useState({
  dietType:"",
  calorieGoal:"",
  allergies:"",
  cuisine:"",
  includeSnacks:false


})
const [loading,setLoading]=useState(false)
const onChangeHandler=(e:any)=>{
  setData({...data,[e.target.name]:e.target.value})
  console.log(data)

}
const onSubmitHandler=async (e)=>{

  e.preventDefault()
  setLoading(true)
  try {
    const response=await axios.post('/api/generate-meal',{
      dietType:data.dietType,
      calorieGoal:data.calorieGoal,
      allergies:data.allergies,
      cuisine:data.cuisine,
      includeSnacks:data.includeSnacks
    })
    setMeals(response.data.diet)
    setData({
      dietType:"",
      calorieGoal:"",
      allergies:"",
      cuisine:"",
      includeSnacks:false
      
    })
    
  } catch (error) {
    console.error(error)
    
  }
  finally{
    setLoading(false)
  }
}

  return (
    <div className=' md:px-11 flex flex-col md:flex-row gap-2'>
        <Card className='bg-green-500 md:max-w-[300px] rounded-none  h-full text-white'>

            <CardHeader>
         <CardTitle className='text-center'>

                    <h1 className='text-2xl text-center'>
                        AI Meal Plan Generator
                    </h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmitHandler} className='flex flex-col space-y-4' action="">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Diet Type
                  </Label>
                  <Input placeholder='' value={data.dietType} onChange={onChangeHandler} name='dietType'  className='bg-white h-12 text-black '/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Daily Calorie Goal
                  </Label>
                  <Input onChange={onChangeHandler} value={data.calorieGoal} name='calorieGoal'  className='bg-white h-12 text-black '/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Allergies And Restrictions
                  </Label>
                  <Input  onChange={onChangeHandler} value={data.allergies} name='allergies' className='bg-white h-12 text-black '/>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Preferred Cuisine
                  </Label>
                  <Input onChange={onChangeHandler} name='cuisine' value={data.cuisine} placeholder=''  className='bg-white h-12 text-black '/>
                </div>
                <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Include Snacks
      </label>
    </div>

    <Button disabled={loading} type='submit'>
        Generate Meal Plan
    </Button>
                </form>
          
        </CardContent>
        </Card>

        <div className='space-y-2 p-2'>

          <h1>Diet Meal Plan</h1>
          {
            meals&&meals.map((meal,idx)=>(
              <Card key={idx}>
                <CardHeader>
                  <h1 className='text-2xl text-blue-400'>{meal.day}</h1>
                </CardHeader>
                <CardContent className='space-y-2'>
                  <p className='text-gray-500'><span className='font-semibold text-black'>Breakfast:</span>{meal.breakfast}</p>
                  <p className='text-gray-500'><span className='font-semibold text-black'>Lunch:</span>{meal.lunch}</p>
                  <p className='text-gray-500'><span className='font-semibold text-black'>Dinner:</span>{meal.dinner}</p>
                </CardContent>

              </Card>
            ))
          }
        </div>


    </div>
  )
}

export default page