import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_PROVIDER_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

/**
 * Função auxiliar para verificar se o usuário existe no Sanity.
 * Caso contrário, cria um novo usuário.
 */
export async function ensureUserExists(
  provider: string,
  userId: string,
  userData: {
    name: string | null | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
    bio: string | null | undefined;
  }
) {
  const existingUser = await client
    .withConfig({ useCdn: false })
    .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, {
      id: userId,
    });

  if (!existingUser) {
    console.log(`Creating new user for provider: ${provider}`);
    await writeClient.create({
      _type: "author",
      id: userId,
      ...userData,
    });
  }
}
