package com.kanhaiya.websockket.service;

import com.kanhaiya.websockket.domain.entity.chat.ChatMessage;
import com.kanhaiya.websockket.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository repository;
    private final ChatRoomService service;

    public ChatMessage save(ChatMessage message){
        String chatId = service.getChatRoomId(
                message.getSenderId(),
                message.getRecipientId(),
                true
        ).orElseThrow(); // create your own exception adn throw here...

        message.setChatId(chatId);
        repository.save(message);
        return message;
    }

    public List<ChatMessage> findChatMessages(
            String senderId, String recipientId
    ){
        Optional<String> chatId = service.getChatRoomId(
                senderId, recipientId, false
        );
        return chatId.map(repository::findByChatId).orElse(new ArrayList<>());
    }
}
