import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

export const runtime = 'nodejs'; // switch to nodejs temporarily for debugging

export async function GET() {
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    const pineconeKey = process.env.PINECONE_API_KEY;
    const pineconeEnv = process.env.PINECONE_ENVIRONMENT;
    const pineconeIndex = process.env.PINECONE_INDEX_NAME;

    if (!openaiKey || !pineconeKey || !pineconeEnv || !pineconeIndex) {
      return new Response(
        JSON.stringify({
          status: 'error',
          message: 'Missing environment variables',
          values: { openaiKey: !!openaiKey, pineconeKey: !!pineconeKey, pineconeEnv, pineconeIndex },
        }),
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: openaiKey });
    const pinecone = new Pinecone({ apiKey: pineconeKey });

    const index = pinecone.index(pineconeIndex!, pineconeEnv!);

    const testText = "This is a test memory. The best dinner is blackened salmon with green beans.";

    const embedding = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: testText,
    });

    await index.upsert([
      {
        id: 'test-doc-1',
        values: embedding.data[0].embedding,
        metadata: { text: testText },
      },
    ]);

    return new Response(JSON.stringify({ status: 'success', message: 'Upserted test memory.' }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
    });
  }
}
