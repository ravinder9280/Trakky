'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState, ChangeEvent, FormEvent, useRef } from 'react'
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton'
import SyncLoader from 'react-spinners/SyncLoader'
interface MealPlanData {
  dietType: string;
  calorieGoal: string;
  allergies: string;
  cuisine: string;
  includeSnacks: boolean;
}


const Page: React.FC = () => {
  const array=new Array(3).fill(null)
  const mealRef=useRef<HTMLDivElement>(null)
  const [meals, setMeals] = useState<any[]>([])
  const [data, setData] = useState<MealPlanData>({
    dietType: "",
    calorieGoal: "",
    allergies: "",
    cuisine: "",
    includeSnacks: false
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<MealPlanData>>({})
  
  useEffect(() => {
    console.log(meals)
  }, [meals])
  

  const validate = (): boolean => {
    const newErrors: Partial<MealPlanData> = {}
    if (!data.dietType) newErrors.dietType = "Diet Type is required"
    if (!data.calorieGoal) newErrors.calorieGoal = "Calorie Goal is required"
    if (!data.allergies) newErrors.allergies = "Allergies are required"
    if (!data.cuisine) newErrors.cuisine = "Cuisine is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setData({ ...data, [name]: type === 'checkbox' ? checked : value })
    console.log(data)
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const response = await axios.post('/api/generate-meal', data)
      setMeals(response.data.diet)
      setData({
        dietType: "",
        calorieGoal: "",
        allergies: "",
        cuisine: "",
        includeSnacks: false
      })
      mealRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
      toast.success('Diet Plan Generated Successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate diet plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='md:px-11 flex flex-col md:items-center md:justify-center  md:border-white md:p-4   md:border-b  md:flex-row gap-2'>
      <Card className=' md:max-w-[300px] rounded-none h-full  overflow-y-hidden'>
        <CardHeader>
          <CardTitle className='text-center'>
            <h1 className='text-2xl text-center'>
              AI Meal Plan Generator
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmitHandler} className='flex flex-col space-y-4'>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Diet Type
              </Label>
              <Input
                placeholder=''
                value={data.dietType}
                onChange={onChangeHandler}
                name='dietType'
                className=' h-12  border-foreground'
              />
              {errors.dietType && <p className="text-red-500">{errors.dietType}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Daily Calorie Goal
              </Label>
              <Input
                onChange={onChangeHandler}
                value={data.calorieGoal}
                name='calorieGoal'
                className=' h-12  border-foreground'
              />
              {errors.calorieGoal && <p className="text-red-500">{errors.calorieGoal}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Allergies And Restrictions
              </Label>
              <Input
                onChange={onChangeHandler}
                value={data.allergies}
                name='allergies'
                className=' h-12  border-foreground'
              />
              {errors.allergies && <p className="text-red-500">{errors.allergies}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Preferred Cuisine
              </Label>
              <Input
                onChange={onChangeHandler}
                name='cuisine'
                value={data.cuisine}
                placeholder=''
                className=' h-12  border-foreground'
              />
              {errors.cuisine && <p className="text-red-500">{errors.cuisine}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
              className='cursor-pointer border-gray-300'
                id="includeSnacks"
                name="includeSnacks"
                
                onClick={()=>{
                  setData({...data,includeSnacks:!data.includeSnacks})
                }}
              />
              <label
                htmlFor="includeSnacks"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include Snacks
              </label>
            </div>
            <Button disabled={loading} type='submit'>
              {
                loading?<SyncLoader size={10} />:"Generate Meal Plan"

              }
            </Button>
          </form>
        </CardContent>
      </Card>
        {loading?<div ref={mealRef} className='space-y-2 overflow-y-auto md:h-[80vh] p-3'>
       {

       }
        <h1 className='text-2xl font-bold text-green-700 pb-2'>Weekly Meal Plan</h1>
        
        {
          array.map((_, idx) => (
            <Card  key={idx}>
              <CardHeader>
                
                <Skeleton className='w-[200px] h-4'/>
              </CardHeader>
              <CardContent className='space-y-2'>
                <Skeleton className='w-[80vw] md:w-[40vw] h-4'/>
                <Skeleton className='w-[80vw] md:w-[40vw] h-4'/>
                <Skeleton className='w-[80vw] md:w-[40vw] h-4'/>
                
                
              </CardContent>
            </Card>
          ))
        }
      </div>:
      

          <div className='space-y-2 overflow-y-auto border md:border-gray-200 md:min-w-[60vw] rounded-2xl md:h-[80vh] p-3'>
        {

        meals[0]?<h1 className='text-2xl font-bold pb-2'>Weekly Meal Plans</h1>:<></>
        }
        
        
        {
          meals && meals.map((meal, idx) => (
            <Card className='shadow-2xl bg-black/80 rounded-2xl' key={idx}>
              <CardHeader>
                <h1 className='text-xl text-blue-400'>{meal.day}</h1>
              </CardHeader>
              <CardContent className='space-y-2'>
                <p className='text-gray-500'><span className='font-semibold text-gray-400 '>Breakfast : </span>{meal.breakfast}</p>
                <p className='text-gray-500'><span className='font-semibold text-gray-400'>Lunch : </span>{meal.lunch}</p>
                <p className='text-gray-500'><span className='font-semibold text-gray-400'>Dinner : </span>{meal.dinner}</p>
              </CardContent>
            </Card>
          ))
        }
      </div>
        }
    </div>
  )
}

export default Page