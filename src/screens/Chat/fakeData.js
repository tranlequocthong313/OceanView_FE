const fakeInboxes = [
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Jane Smith',
        lastMessage: "Let's catch up later.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Sam Wilson',
        lastMessage: 'Are you coming to the meeting?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Emma Johnson',
        lastMessage: "Sure, I'll be there.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Paul Walker',
        lastMessage: 'See you tomorrow!',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        name: 'Lucy Brown',
        lastMessage: 'Can we reschedule our meeting?',
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Jane Smith',
        lastMessage: "Let's catch up later.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Sam Wilson',
        lastMessage: 'Are you coming to the meeting?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Emma Johnson',
        lastMessage: "Sure, I'll be there.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Paul Walker',
        lastMessage: 'See you tomorrow!',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        name: 'Lucy Brown',
        lastMessage: 'Can we reschedule our meeting?',
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Jane Smith',
        lastMessage: "Let's catch up later.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Sam Wilson',
        lastMessage: 'Are you coming to the meeting?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Emma Johnson',
        lastMessage: "Sure, I'll be there.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Paul Walker',
        lastMessage: 'See you tomorrow!',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        name: 'Lucy Brown',
        lastMessage: 'Can we reschedule our meeting?',
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        name: 'John Doe',
        lastMessage: 'Hey, how are you?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        name: 'Jane Smith',
        lastMessage: "Let's catch up later.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        name: 'Sam Wilson',
        lastMessage: 'Are you coming to the meeting?',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        name: 'Emma Johnson',
        lastMessage: "Sure, I'll be there.",
        isOnline: false,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        name: 'Paul Walker',
        lastMessage: 'See you tomorrow!',
        isOnline: true,
    },
    {
        id: Math.random(),
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
        name: 'Lucy Brown',
        lastMessage: 'Can we reschedule our meeting?',
        isOnline: false,
    },
    // Add more fake data as needed
];

const generateFakeMessages = (inboxId) => [
    {
        id: Math.random(),
        text: 'Hello!',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 100000000)),
        user: {
            id: inboxId,
            name: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
    },
    {
        id: Math.random(),
        text: 'How are you?',
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 100000000)),
        user: {
            id: inboxId,
            name: 'Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
    },
];

const fakeMessages = fakeInboxes.reduce((acc, inbox) => {
    acc[inbox.id] = generateFakeMessages(inbox.id);
    return acc;
}, {});

export { fakeInboxes, fakeMessages };
