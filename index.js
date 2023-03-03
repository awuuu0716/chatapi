const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const readline = require("readline-sync");

class Models {
  turbo = "gpt-3.5-turbo";
  davinci = "text-davinci-003";
}

class ChatGPT {
  configuration;
  openai;
  models = new Models();
  userInput = "";

  constructor() {
    this.init();
  }

  init() {
    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async startChat() {
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

  getUserInput() {
    this.userInput = readline.question();
  }

  printAIResponse(completion) {
    console.log(`\nAI: ${completion.data.choices[0].message.content} \n`);
  }
}

const chatGPT = new ChatGPT();

chatGPT.startChat();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// async function startChat() {
//   const input = readline.question();
//   if (input === "bye") return;

//   try {
//     // const response = await openai.createCompletion({
//     //   model: models.davinci,
//     //   prompt: input,
//     //   max_tokens: 7,
//     //   temperature: 0,
//     // });
//     // console.log(response.data.choices);

//     const completion = await openai.createChatCompletion({
//       model: models.turbo,
//       messages: [{ role: "user", content: input }],
//     });

//     printAIResponse(completion);

//     startChat();
//   } catch (err) {
//     console.log(err);
//   }
// }
