import { z } from "zod";

type ErrorWrapperProps = {
  children: React.ReactNode;
};

export function ErrorWrapper({ children }: ErrorWrapperProps) {
  const openAiKeySchema = z.string().min(51).startsWith("sk-");
  const pineconeKeySchema = z.string();

  const openAiKeyResult = openAiKeySchema.safeParse(process.env.OPENAI_API_KEY);
  const pineconeKeyResult = pineconeKeySchema.safeParse(
    process.env.PINECONE_API_KEY,
  );

  const getEnvError = () => {
    if (!process.env.OPENAI_API_KEY && !process.env.PINECONE_API_KEY) {
      return "Are you sure you have an .env file at the project root? (Same level as package.json) Please copy .env.template to .env and add your API keys. If you have an .env file, make sure it's not empty or no keys are filled out.";
    }

    if (!process.env.OPENAI_API_KEY) {
      return "OpenAI API key is not set in .env file. Fill out the OPENAI_API_KEY variable in the .env file.";
    }

    if (!openAiKeyResult.success) {
      return "Invalid OpenAI API key format. Key should start with 'sk-' and be at least 51 characters. Get it from OpenAI dashboard.";
    }

    if (!process.env.PINECONE_API_KEY) {
      return "Pinecone API key is not set in .env file. Fill out the PINECONE_API_KEY variable in the .env file.";
    }

    if (!pineconeKeyResult.success) {
      return "Invalid Pinecone API key format. Key should be a valid UUID. Get it from Pinecone dashboard.";
    }

    return null;
  };

  const error = getEnvError();

  if (error)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-red-700">
        <div className="w-full max-w-2xl border-[1px] border-red-900 p-4">
          <h1 className="text-2xl font-bold text-white">Error</h1>
          <p className="text-sm text-white">{error}</p>
        </div>
      </div>
    );

  return children;
}
