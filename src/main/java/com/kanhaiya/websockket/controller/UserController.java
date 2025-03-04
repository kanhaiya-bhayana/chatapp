package com.kanhaiya.websockket.controller;

import com.kanhaiya.websockket.domain.entity.User;
import com.kanhaiya.websockket.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("")
public class UserController {
    private final UserService service;

    @MessageMapping("/user.addUser")
    @SendTo("/user/topic")
    public User addUser(
            @Payload User user
    ){
        service.saveUser(user);
        return user;
    }

    @MessageMapping("/user.disconnectMapping")
    @SendTo("/user/topic")
    public User disconnect(
            @Payload User user
    ){
        service.disconnect(user);
        return user;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> findConnectedUser(){
        return ResponseEntity.ok(service.findConnectedUser());
    }
}
