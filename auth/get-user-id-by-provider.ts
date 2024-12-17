import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_PROVIDER_ID_QUERY } from "@/sanity/lib/queries";

/**
 * Função auxiliar para buscar o ID do usuário pelo provider.
 */
export async function getUserIdByProvider(provider: string, id: string) {
  return client
    .withConfig({ useCdn: false })
    .fetch(AUTHOR_BY_PROVIDER_ID_QUERY, { id });
}
