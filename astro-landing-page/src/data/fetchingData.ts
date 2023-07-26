// const response = await fetch('https://random-data-api.com/api/v2/users?size=6');
// const data: Character[] = await response.json();

// const mappedData = data.map((person: Character) => {
// 	// age of person
// 	const ageOfBirthToDate = new Date(person.date_of_birth).getFullYear();
// 	const currentDate = new Date().getFullYear();
// 	const currentAge = currentDate - ageOfBirthToDate;

// 	// Mapped new avatar Image
// 	const id = person.id;
// 	const newAvatar = `https://api.multiavatar.com/${id}.svg`;

// 	return {
// 		id: person.id,
// 		first_name: person.first_name,
// 		last_name: person.last_name,
// 		username: person.username,
// 		gender: person.gender,
// 		date_of_birth: person.date_of_birth,
// 		age: currentAge,
// 		img: newAvatar,
// 		employment: {
// 			title: person.employment.title,
// 			key_skill: person.employment.key_skill
// 		}
// 	};
// });

let clientId = import.meta.env.ASTRO_TWITCH_CLIENT_ID;
let clientSecret = import.meta.env.ASTRO_TWITCH_CLIENT_SECRET;
const getTwitchAuthorization = async () => {
	let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

	const response = await fetch(url, {
		method: 'POST'
	});
	const data = response.json();
	return data;
	// return {
	// 	Authorization: `Bearer ${data.access_token}`,
	// 	clientId: clientId
	// };
};

// user id
const twitchUserId = async (name: string, headers) => {
	const userUrl = `https://api.twitch.tv/helix/users?login=${name}`;

	const response = await fetch(userUrl, {
		headers
	});

	const { data } = await response.json();
	return {
		id: data[0].id
	};
};

type twitchParameters = {
	name?: string;
	id?: string;
	url_api: string;
};

// get data
const twitchData = async (params: twitchParameters) => {
	const { Authorization, clientId } = await getTwitchAuthorization();

	const headers = {
		Authorization,
		'Client-id': clientId
	};

	const response = await fetch(params.url_api, { headers });
	const data = await response.json();
	return data;
};

export { getTwitchAuthorization, twitchData, twitchUserId };
