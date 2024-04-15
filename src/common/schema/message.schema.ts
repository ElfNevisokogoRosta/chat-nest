import { z } from 'zod';

const messageSchema = z.object({
  author: z.number(),
  chat_id: z.number(),
  text: z.string().default(null).nullable(),
  image: z.string().default(null).nullable(),
  audio: z.string().default(null).nullable(),
});

const createMessage = messageSchema.required();
const updateMessage = messageSchema.partial();

export type CreateMessageDto = z.infer<typeof createMessage>;
export type UpdateMessageDto = z.infer<typeof updateMessage>;
