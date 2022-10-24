package com.IP.App.controller;

import com.IP.App.Models.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ToDoRepository extends MongoRepository<Todo,String> {
}
