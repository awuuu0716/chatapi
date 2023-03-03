import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import * as readline from "readline-sync";
import * as dotenv from "dotenv";
import { AxiosResponse } from "axios";

dotenv.config();

class Models {
  turbo = "gpt-3.5-turbo";
  davinci = "text-davinci-003";
}

class ChatGPT {
  private configuration?: Configuration;
  private openai?: OpenAIApi;
  private models = new Models();

  constructor() {
    this.init();
  }

  private init() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  public async startChat() {
    const input = readline.question();

    if (!this.openai) return;

    try {
      const completion = await this.openai.createChatCompletion({
        model: this.models.turbo,
        messages: [{ role: "user", content: input }],
      });

      this.printAIResponse(completion);

      this.startChat();
    } catch (error) {
      console.error(error);
    }
  }

  private printAIResponse(
    completion: AxiosResponse<CreateChatCompletionResponse>
  ) {
    const { choices } = completion.data;
    choices.forEach((c) => {
      console.log(`\nAI: ${c.message?.content} \n`);
    });
  }
}

const chatGPT = new ChatGPT();

chatGPT.startChat();
