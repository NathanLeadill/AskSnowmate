import type { ConversationType } from './conversation';

type ActionableMessage = {
	role: ConversationType;
	content: string;
	onSuccess: () => unknown;
	onFail: () => false;
};

type MessageAction = {};
