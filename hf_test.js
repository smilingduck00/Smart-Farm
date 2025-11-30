import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_API_KEY);

const run = async () => {
  const chatCompletion = await client.chatCompletion({
    model: process.env.HF_MODEL_ID || "HuggingFaceH4/zephyr-7b-beta",
    messages: [
      { role: "user", content: "Salam, hansı modeldən istifadə edirsən?" },
    ],
  });
  console.log(chatCompletion);
};

run().catch(console.error);