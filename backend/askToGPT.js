require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const askToGPT = async (
    user_input,
    system_input,
    old_messages,
    temperature
) => {
    const messages = [];

    messages.push({
        role: "system",
        content: system_input,
    });

    // Ajouter les anciens messages
    for (let i = 0; i < old_messages.length; i++) {
        messages.push(old_messages[i]);
    }

    messages.push({
        role: "user",
        content: user_input,
    });

    console.log("Entrée pour Chat GPT :");
    console.log(messages);

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: temperature,
        });

        return response.data.choices[0].message;
    } catch (error) {
        console.error(
            "Erreur lors de la demande de complétion à OpenAI :",
            error
        );

        return '{content: "Une erreur s\'est produite lors de la demande à OpenAI."}';
    }
};

module.exports = askToGPT;
