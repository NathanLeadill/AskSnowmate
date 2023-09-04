import { quests } from '$lib/database.js';

export const load = ({ params }) => {
	const { quest_id } = params;
	const quest = quests.find((quest) => quest.id === quest_id);
	return {
		quest_id: params.quest_id,
		quest
	};
};
