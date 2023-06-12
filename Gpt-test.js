const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
     apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

var rl = require('readline-sync');

async function startAssistant() {
   var messages = [];

   var input = rl.question('What type of chatbot would you like to create? > ');
   messages.push({"role": "system", "content": "Stay in character. You are " + input});

   input = rl.question("Say hello to your new chatbot > ");
   while(true) {
       messages.push({"role": "user", "content": input});

       console.log("...");
       const completion = await openai.createChatCompletion({
         model: "gpt-4",
         messages: messages,
       });

       var reply = completion.data.choices[0].message.content;
       messages.push({"role": "assistant", "content": reply});
       console.log(reply);
       input = rl.question("> ");
   }
}


https://www.haihai.ai/gpt-4-js/

startAssistant();