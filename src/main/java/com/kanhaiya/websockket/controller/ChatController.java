package com.kanhaiya.websockket.controller;

import com.kanhaiya.websockket.domain.entity.chat.ChatMessage;
import com.kanhaiya.websockket.extension.ChatNotification;
import com.kanhaiya.websockket.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessagingTemplate template;
    private final ChatMessageService service;

    @MessageMapping("/chat")
    public void  processMessage(
            @Payload ChatMessage message
    ){
        ChatMessage savedMessage = service.save(message);
        template.convertAndSendToUser(
                message.getRecipientId(),
                "/queue/messages",
                ChatNotification.builder()
                        .id(savedMessage.getId())
                        .senderId(savedMessage.getSenderId())
                        .recipientId(savedMessage.getRecipientId())
                        .content(savedMessage.getContent())
                        .build()
        );
    }

    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> findChatMessages(
            @PathVariable("senderId") String senderId,
            @PathVariable("recipientId") String recipientId
    ){
        return ResponseEntity.ok(service.findChatMessages(senderId, recipientId));
    }

}
