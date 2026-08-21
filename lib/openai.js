const OpenAI = require('openai');

let client;

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const error = new Error('OPENAI_API_KEY is not configured on the server.');
    error.code = 'OPENAI_CONFIG_MISSING';
    throw error;
  }

  if (!client) {
    client = new OpenAI({
      apiKey,
      timeout: 30000,
      maxRetries: 2
    });
  }

  return client;
}

function getOpenAIModel() {
  return process.env.OPENAI_MODEL || 'gpt-5.6-terra';
}

async function createStructuredResponse({ input, instructions, schema, schemaName = 'magic_book_response', model }) {
  const openai = getOpenAIClient();
  const response = await openai.responses.create({
    model: model || getOpenAIModel(),
    instructions,
    input,
    text: {
      format: {
        type: 'json_schema',
        name: schemaName,
        strict: true,
        schema
      }
    }
  });

  const output = String(response.output_text || '').trim();
  if (!output) throw new Error('OpenAI returned an empty response.');

  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`OpenAI returned invalid JSON: ${error.message}`);
  }
}

module.exports = {
  getOpenAIClient,
  getOpenAIModel,
  createStructuredResponse
};
