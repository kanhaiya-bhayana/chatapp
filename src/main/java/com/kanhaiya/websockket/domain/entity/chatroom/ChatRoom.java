package com.kanhaiya.websockket.domain.entity.chatroom;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
@Builder
public class ChatRoom {

    @Id
    private String id;
    private String chatId;
    private String senderId;
    private String recipientId;
}
