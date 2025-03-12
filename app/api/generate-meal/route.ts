import { generateMeal } from '@/lib/gemini';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { dietType, calorieGoal, allergies, cuisine, includeSnacks } = await req.json();

  // Perform your meal plan generation logic here
  const diet= await generateMeal(JSON.stringify({dietType, calorieGoal, allergies, cuisine, includeSnacks}));
  const mealPlan = {
    dietType,
    calorieGoal,
    allergies,
    cuisine,
    includeSnacks,
    diet:diet.diet
  };

  return NextResponse.json(mealPlan);
}

export const GET= async()=>{
  return NextResponse.json({message: 'Hello from GET endpoint'})

}