// data/mockData.ts

// --- INTERFEJSY DANYCH ---
export interface User {
  id: string;
  username: string;
  avatar: string; // URL do awatara
  status: 'online' | 'idle' | 'do_not_disturb' | 'offline';
}

export interface Message {
  id: string;
  author: User;
  timestamp: string; // Format ISO 8601, np. "2024-05-23T10:30:00Z"
  content: string;
}

export type ChannelType = 'text' | 'voice';

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  messages?: Message[]; // Tylko dla kanałów tekstowych
  members?: User[]; // Tylko dla kanałów głosowych
}

export interface Server {
  id: string;
  name: string;
  icon: string; // URL do ikony serwera (placeholder)
  channels: Channel[];
  members: User[]; // Wszyscy członkowie serwera
}

export interface DirectMessage {
  id: string;
  user: User;
  messages: Message[];
  lastMessageTime: string;
}

// --- PRZYKŁADOWE DANE ---

const users: { [key: string]: User } = {
  'user1': { id: 'user1', username: 'Mruczek', avatar: 'https://cdn.discordapp.com/embed/avatars/0.png', status: 'online' },
  'user2': { id: 'user2', username: 'Puszek', avatar: 'https://cdn.discordapp.com/embed/avatars/1.png', status: 'idle' },
  'user3': { id: 'user3', username: 'Łapka', avatar: 'https://cdn.discordapp.com/embed/avatars/2.png', status: 'do_not_disturb' },
  'user4': { id: 'user4', username: 'Kłębuszek', avatar: 'https://cdn.discordapp.com/embed/avatars/3.png', status: 'offline' },
  'user5': { id: 'user5', username: 'Filemon', avatar: 'https://cdn.discordapp.com/embed/avatars/4.png', status: 'online' },
};

export const mockServers: Server[] = [
  {
    id: 'server1',
    name: 'Kitty Cafe Central',
    icon: 'https://i.imgur.com/2s3621X.png', // Przykładowa ikona serwera (możesz zmienić)
    members: [users.user1, users.user2, users.user3, users.user4, users.user5],
    channels: [
      {
        id: 'channel1_1',
        name: 'ogólny',
        type: 'text',
        messages: [
          { id: 'msg1', author: users.user1, timestamp: '2024-05-23T10:00:00Z', content: 'Witajcie w Kitty Cafe! Co tam u Was?' },
          { id: 'msg2', author: users.user2, timestamp: '2024-05-23T10:05:00Z', content: 'Hej! Świetnie, jak zawsze mnóstwo jedzenia!' },
          { id: 'msg3', author: users.user3, timestamp: '2024-05-23T10:10:00Z', content: 'Ktoś widział moją ulubioną kulkę?' },
        ],
      },
      {
        id: 'channel1_2',
        name: 'pomoc-dla-czworonogow',
        type: 'text',
        messages: [
          { id: 'msg4', author: users.user4, timestamp: '2024-05-23T09:30:00Z', content: 'Mój ogon przestał machać, co robić?' },
        ],
      },
      {
        id: 'channel1_3',
        name: 'kocie-pogawędki',
        type: 'voice',
        members: [users.user1, users.user5],
      },
      {
        id: 'channel1_4',
        name: 'relaks-i-drzemki',
        type: 'voice',
        members: [],
      },
    ],
  },
  {
    id: 'server2',
    name: 'Mruczące Memes',
    icon: 'https://i.imgur.com/3Z61E0T.png', // Przykładowa ikona serwera
    members: [users.user1, users.user3, users.user5],
    channels: [
      {
        id: 'channel2_1',
        name: 'memes-tekstowe',
        type: 'text',
        messages: [
          { id: 'msg5', author: users.user1, timestamp: '2024-05-22T18:00:00Z', content: 'Ktoś widział mema z kotem w pudełku?' },
        ],
      },
      {
        id: 'channel2_2',
        name: 'glosowe-memy',
        type: 'voice',
        members: [users.user3],
      },
    ],
  },
];

export const mockDMs: DirectMessage[] = [
  {
    id: 'dm1',
    user: users.user2,
    lastMessageTime: '2024-05-23T12:15:00Z',
    messages: [
      { id: 'dm1_msg1', author: users.user2, timestamp: '2024-05-23T12:10:00Z', content: 'Hej, co słychać?' },
      { id: 'dm1_msg2', author: users.user1, timestamp: '2024-05-23T12:15:00Z', content: 'Wszystko dobrze, a u Ciebie?' },
    ],
  },
  {
    id: 'dm2',
    user: users.user3,
    lastMessageTime: '2024-05-22T18:30:00Z',
    messages: [
      { id: 'dm2_msg1', author: users.user3, timestamp: '2024-05-22T18:25:00Z', content: 'Widziałeś najnowszą zabawkę?' },
      { id: 'dm2_msg2', author: users.user1, timestamp: '2024-05-22T18:30:00Z', content: 'Jeszcze nie, warto?' },
    ],
  },
  {
    id: 'dm3',
    user: users.user5,
    lastMessageTime: '2024-05-21T09:45:00Z',
    messages: [
      { id: 'dm3_msg1', author: users.user1, timestamp: '2024-05-21T09:40:00Z', content: 'Kiedy spotkanie?' },
      { id: 'dm3_msg2', author: users.user5, timestamp: '2024-05-21T09:45:00Z', content: 'O 16:00 przy misce z karmą' },
    ],
  },
];

// Aktualny zalogowany użytkownik
export const currentUser: User = users.user1;