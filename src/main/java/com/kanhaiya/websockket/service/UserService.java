package com.kanhaiya.websockket.service;

import com.kanhaiya.websockket.domain.enums.Status;
import com.kanhaiya.websockket.domain.entity.User;
import com.kanhaiya.websockket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    public void saveUser(User user){
        user.setStatus(Status.ONLINE);
        repository.save(user);
    }

    public void disconnect(User user){
        User storedUser = repository.findById(user.getNickName())
                .orElse(null);
        if (storedUser != null){
            storedUser.setStatus(Status.OFFLINE);
            repository.save(storedUser);
        }
    }

    public List<User> findConnectedUser(){
        return repository.findAllByStatus(Status.ONLINE);
    }

}
