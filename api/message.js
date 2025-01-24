import {get, post, put, del} from '@/request';

// 消息列表
export const myCenter = (params) => {
    return get('/imChatWindows/myCenter', { params });
};

// 获取聊天记录
export const getChatMessages = (params) => {
    return get('/imChatWindows/messages', { params });
};

// 发送消息
export const sendMessage = (data) => {
    return post('/imChatWindows/send', data);
};

// 标记消息已读
export const markAsRead = (chatId) => {
    return put(`/imChatWindows/${chatId}/read`);
};