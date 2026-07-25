import { openai } from "./openai.service.js";

export class ManufacturingAgent {

  async chat(userMessage: string) {

    const response = await openai.responses.create({
      model: "gpt-5.5",

      input: [
        {
          role: "system",
          content:
            `You are Edith AI, an intelligent manufacturing assistant.
            
You help factory managers analyze machines.

When appropriate, use the available manufacturing tools.

Always explain the recommendation in simple business language.`
        },

        {
          role: "user",
          content: userMessage
        }
      ]
    });

    return response.output_text;
  }

}