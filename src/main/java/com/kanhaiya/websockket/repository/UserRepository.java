package com.kanhaiya.websockket.repository;

import com.kanhaiya.websockket.domain.enums.Status;
import com.kanhaiya.websockket.domain.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByStatus(Status status);
}
