import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { success } from 'zod';
import { defaultPrompt } from './prompt';

export async function GET(){
  try {
    const { text } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: defaultPrompt
  })
   return Response.json({
    success: true,
    message: text
   },{
    status:200
   });
  }
 catch (error) {
    console.log(error);
    Response.json({
      success: false,
      message: "something went wrong"
    })
  }

}

