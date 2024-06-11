import firestore from '@react-native-firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import theme from '~/core/theme';
import { useUser } from '~/hooks/useUser';
import { authAPI, chatApis } from '~/utils/api';
import getQuerys from '~/utils/url';

export default function ChatScreen({ route }) {
    const user = useUser();

    const { id: inboxId } = route.params;
    const [messages, setMessages] = useState([]);
    const [isNextMessage, setIsNextMessage] = useState(false);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [nextUrl, setNextUrl] = useState(null);
    const [url, setUrl] = useState(chatApis.messages(inboxId));
    const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await (await authAPI()).get(url);
                const results = data.results.map((item) => {
                    if (item.sender === data.inbox.user.resident_id) {
                        return {
                            _id: item.id,
                            text: item.content,
                            createdAt: item.created_date,
                            user: { _id: item.sender, name: data.inbox.user.full_name, avatar: data.inbox.user.avatar },
                        };
                    }
                    return {
                        _id: item.id,
                        text: item.content,
                        createdAt: item.created_date,
                        user: { _id: item.sender, name: user.personal_information.full_name, avatar: user.avatar },
                    };
                });
                if (isNextMessage) {
                    setMessages((prev) => [...prev, ...results]);
                } else {
                    setMessages(results);
                }
                if (data.next) {
                    const { limit: _limit, offset: _offset } = getQuerys(data.next);
                    if (_limit && _offset) {
                        setLimit(Number(_limit));
                        setOffset(Number(_offset));
                    }
                }
                setNextUrl(data.next);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingEarlier(false);
            }
        };

        fetchMessages();
    }, [isNextMessage, url, user.avatar, user.personal_information.full_name]);

    useEffect(() => {
        const onError = (error) => {
            console.error(error);
        };
        const subscriber = firestore()
            .collection('messages')
            .where('inbox', '==', inboxId)
            .orderBy('created_date', 'desc')
            .onSnapshot((snap) => {
                let count = 0;
                const newMessages = snap.docChanges().map((documentSnapshot) => {
                    if (documentSnapshot.type === 'added') {
                        count += 1;
                    } else if (documentSnapshot.type === 'removed') {
                        count -= 1;
                        return {};
                    }
                    const data = documentSnapshot.doc.data();
                    return {
                        _id: data.id,
                        text: data.content,
                        createdAt: data.created_date.toDate(),
                        user: {
                            _id: data?.sender.resident_id,
                            name: data?.sender?.full_name,
                            avatar: data?.sender?.avatar,
                        },
                    };
                });
                setMessages((prevMessages) => {
                    const oldLength = prevMessages.length;
                    const updatedMessages = [...newMessages, ...prevMessages];
                    const final = Array.from(new Set(updatedMessages.map((a) => a._id))).map((id) =>
                        updatedMessages.find((a) => a._id === id),
                    );
                    if (oldLength < final.length) {
                        setOffset((prev) => prev + count);
                    } else if (oldLength > final.length) {
                        setOffset((prev) => prev - count);
                    }
                    return final;
                });
            }, onError);
        return () => {
            subscriber();
        };
    }, [inboxId]);

    const loadEarlierMessages = () => {
        if (nextUrl) {
            setIsLoadingEarlier(true);
            setIsNextMessage(true);
            setUrl(`${chatApis.messages(inboxId)}?limit=${limit}&offset=${offset}`);
        }
    };

    const onSend = useCallback(
        async (_messages = []) => {
            const { resident_id: residentId } = user;
            await (
                await authAPI()
            ).post(chatApis.sendMessage(inboxId), {
                inbox: inboxId,
                content: _messages[0].text,
                sender: residentId,
            });
        },
        [inboxId, user],
    );

    return (
        <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{
                _id: user.resident_id,
            }}
            infiniteScroll
            loadEarlier={!!nextUrl}
            onLoadEarlier={loadEarlierMessages}
            isLoadingEarlier={isLoadingEarlier}
            renderUsernameOnMessage
            renderBubble={(props) => (
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: {
                            backgroundColor: theme.colors.primary,
                        },
                        left: {
                            backgroundColor: 'white',
                        },
                    }}
                />
            )}
        />
    );
}
