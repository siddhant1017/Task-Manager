package com.IP.App.controller;

import com.IP.App.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
}
