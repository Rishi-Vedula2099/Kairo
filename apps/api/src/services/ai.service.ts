import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

const masterPrompt = `
You are an intelligent workflow agent.

Goal:
Execute multi-step workflows using available tools and APIs.

Capabilities:
- Understand user intent
- Decide next best action dynamically
- Call tools (webhooks, APIs)
- Handle failures with retries or fallback logic

Rules:
- Always validate inputs before execution
- Log every step with reasoning
- Optimize for minimal API calls
- If unsure, ask for clarification

Context:
{context}

Current Step:
{currentStep}

Available Tools:
{tools}

Output:
Structured JSON as specified.
`;

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    action: z.string().describe("The action to perform"),
    tool: z.string().describe("The tool to use"),
    input: z.record(z.any()).describe("The input for the tool"),
    reasoning: z.string().describe("The reasoning behind this decision"),
  })
);

export class AIService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4-turbo-preview",
      temperature: 0,
    });
  }

  async decideNextStep(context: any, currentStep: any, tools: string[]) {
    const formatInstructions = parser.getFormatInstructions();
    const prompt = new PromptTemplate({
      template: masterPrompt + "\n{format_instructions}",
      inputVariables: ["context", "currentStep", "tools"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({
      context: JSON.stringify(context),
      currentStep: JSON.stringify(currentStep),
      tools: tools.join(", "),
    });

    const response = await this.model.invoke(input);
    return parser.parse(response.content as string);
  }
}
