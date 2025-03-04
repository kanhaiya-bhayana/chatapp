package com.kanhaiya.websockket.service;

import com.kanhaiya.websockket.domain.entity.chatroom.ChatRoom;
import com.kanhaiya.websockket.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository repository;
    public Optional<String> getChatRoomId(
            String senderId,
            String recipientId,
            boolean createNewRoomIfNotExists
    ){
        return repository.findBySenderIdAndRecipientId(senderId,recipientId)
                .map(ChatRoom::getChatId)
                .or(() ->{
                    if (createNewRoomIfNotExists){
                        String chatId = createChat(senderId, recipientId);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private String createChat(String senderId, String recipientId){
        String chatId = String.format("%s_%s",senderId, recipientId);

        ChatRoom senderRecipient = ChatRoom.builder()
                .chatId(chatId)
                .senderId(senderId)
                .recipientId(recipientId)
                .build();

        ChatRoom recipientSender = ChatRoom.builder()
                .chatId(chatId)
                .senderId(recipientId)
                .recipientId(senderId)
                .build();

        repository.save(senderRecipient);
        repository.save(recipientSender);

        return chatId;
    }
}
