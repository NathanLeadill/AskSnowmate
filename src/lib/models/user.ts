type User = {
	email: string;
	password: string;
	token?: string;
};

type ActivityTag = string;
type Country = string;

type AccountProfile = {
	activityTags: ActivityTag[];
	placesEnjoyed: Country[];
};
export type { User, AccountProfile };
