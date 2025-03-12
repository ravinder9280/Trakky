'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'sonner';
import BarLoader from 'react-spinners/BarLoader'
interface MealPlanData {
  dietType: string;
  calorieGoal: string;
  allergies: string;
  cuisine: string;
  includeSnacks: boolean;
}


const Page: React.FC = () => {
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
      toast.success('Diet Plan Generated Successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to generate diet plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='md:px-11 flex flex-col md:flex-row gap-2'>
      <Card className='bg-green-500 md:max-w-[300px] rounded-none h-full text-white overflow-y-hidden'>
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
                className='bg-white h-12 text-black'
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
                className='bg-white h-12 text-black'
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
                className='bg-white h-12 text-black'
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
                className='bg-white h-12 text-black'
              />
              {errors.cuisine && <p className="text-red-500">{errors.cuisine}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
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
              Generate Meal Plan
            </Button>
          </form>
        </CardContent>
      </Card>
        {loading?<div className=' flex flex-col items-center justify-center h-[80vh] w-full'>
          <BarLoader/>
        </div>:

          <div className='space-y-2 overflow-y-auto md:h-[80vh] p-3'>
        <h1 className='text-2xl font-bold text-green-700 pb-2'>Weekly Meal Plan</h1>
        
        {
          meals && meals.map((meal, idx) => (
            <Card key={idx}>
              <CardHeader>
                <h1 className='text-xl text-blue-400'>{meal.day}</h1>
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
        }
    </div>
  )
}

export default Page