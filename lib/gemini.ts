import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateMeal=async (data:string)=>{
    // if(process.env.GOOGLE_GEMINI_API_KEY){
    //     throw new Error("no api key provided")
    // }
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY||"");


      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      
      const result = await model.generateContent(`create a meal plan for a week according to the ${data}.
        Return the response in this JSON format only , no additional text :
        {
        
        "diet":[
        {"day":"string",
        "breakfast":"string- 200 calories",
        "lunch":"string",
        "dinner":"string",
        "snack":"string"
      }
      ],
      "exercises":[
      {"day":"string",
      "morning":"string - reps and sets",
      "evening":"string - reps and sets",
      "night":"string - reps and sets",
      },
      ]
        }


        your response will be saved into the database dont return any additional text only return JSON.
        `);
        const response = result.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const dietJson = JSON.parse(cleanedText);
        return dietJson;
  }
  // console.log(await generateMeal(
  //   `dietType: weight gain,
  // calorieGoal: 1500,
  // allergies: none,
  // cuisine: indian,
  // includeSnacks: true,
  // dietType:vegetarian
  // `

  // ))
