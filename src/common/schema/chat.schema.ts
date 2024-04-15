import { z } from 'zod';

const chatSchema = z.object({
  chat_name: z.string(),
  admin: z.number(),
});

const createChat = chatSchema.required();
const updateChat = chatSchema.partial();

export type CreateChatDto = z.infer<typeof createChat>;
export type UpdateChatDto = z.infer<typeof updateChat>;
