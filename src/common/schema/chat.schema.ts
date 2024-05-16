import { z } from 'zod';

const chatSchema = z.object({
  chat_name: z.string(),
  members: z.array(z.number()),
  created_at: z.string(),
});

const createChat = chatSchema.required();
const updateChat = chatSchema.partial();

export type CreateChatDto = z.infer<typeof createChat>;
export type UpdateChatDto = z.infer<typeof updateChat>;
