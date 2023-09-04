type ConversationType = 'user' | 'assistant' | 'function' | 'system';
type ConversationEntry = {
	role: ConversationType;
	content: string;
};

export type { ConversationType, ConversationEntry };
