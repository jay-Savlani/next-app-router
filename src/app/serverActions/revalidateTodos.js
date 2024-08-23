"use server";

/**
 * This file is a server action
 * Therefore using use server directive
 * https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#client-components
 */

/**
 * This function is to invalidate Next.js client router cache
 * Next js caches the pages on client side. This is for performance.
 * But for cases where you want each page to be re-rendered again from the server and sent back to the client,
 * you need this function.
 * revalidatePath will invalidate all cached paths in the router cache. This will change it future.
 * https://nextjs.org/docs/app/api-reference/functions/revalidatePath
 */
import { revalidatePath } from "next/cache";

export async function revalidateTodos() {
  revalidatePath("/todo-list", "page");
}
