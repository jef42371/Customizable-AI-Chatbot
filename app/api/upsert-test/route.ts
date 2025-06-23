import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

export const runtime = 'edge';

export async function GET() {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

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

