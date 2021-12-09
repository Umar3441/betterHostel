import { users } from "./users";

export const posts = [
    {
        imageUrl: 'https://source.unsplash.com/1024x768/?forest',
        user: users[0].user,
        likes: 7870,
        caption: 'This is amzing destination',
        profile_picture: users[0].image,
        comments: [
            {
                user: 'umar',
                comment: 'Hey this is great'
            },
            {
                user: 'arslan',
                comment: 'Hey this is great brother'
            }
        ]
    },
    {
        imageUrl: 'https://source.unsplash.com/1024x768/?man',
        user: users[1].user,
        likes: 7870,
        caption: 'This is amzing destination',
        profile_picture: users[1].image,
        comments: [
            {
                user: 'umar',
                comment: 'Hey this is great'
            },
            {
                user: 'arslan',
                comment: 'Hey this is great brother'
            }
        ]
    },
    {
        imageUrl: 'https://source.unsplash.com/1024x768/?mountain',
        user: users[2].user,
        likes: 7870,
        caption: 'This is amzing destination',
        profile_picture: users[2].image,
        comments: [
            {
                user: 'umar',
                comment: 'Hey this is great'
            },
            {
                user: 'arslan',
                comment: 'Hey this is great brother'
            }
        ]
    }
]