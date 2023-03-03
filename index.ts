import { Configuration, CreateChatCompletionResponse, OpenAIApi } from "openai";
import readline from "readline-sync";
import dotenv from "dotenv";
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
  private userInput = "";

  constructor() {
    this.init();
  }

  private init() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async startChat() {
    if (!this.openai) return;
    // this.getUserInput();
    try {
      const completion = await this.openai.createChatCompletion({
        model: this.models.turbo,
        messages: [{ role: "user", content: "hey siri" }],
      });

      this.printAIResponse(completion);
    } catch (error) {
      console.error(error);
    }
  }

  private getUserInput() {
    this.userInput = readline.question();
  }

  private printAIResponse(
    completion: AxiosResponse<CreateChatCompletionResponse>
  ) {
    const { choices } = completion.data;
    console.log(choices);
    // console.log(`\nAI: ${completion.data.choices?[0].message.content} \n`);
  }
}

const chatGPT = new ChatGPT();

chatGPT.startChat();
