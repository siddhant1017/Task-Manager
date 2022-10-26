package com.IP.App.controller;

import com.IP.App.Models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
public class ToDoController {

    @Autowired
    ToDoRepository todoRepository;

    @GetMapping("/todos")
    public List<Todo> getAllTodosByLoginId(@RequestBody Todo todo) {
        Sort sortByCreatedAtDesc = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Todo> allTasks =todoRepository.findAll(sortByCreatedAtDesc);
        List<Todo> allTodosByLoginId = new ArrayList<>();
        for(int i=0;i<allTasks.size();i++){
            if(allTasks.get(i).getLoginId().equals(todo.getLoginId())){
                allTodosByLoginId.add(allTasks.get(i));
            }
        }
        return allTodosByLoginId;
    }

    @PostMapping("/createTodos")
    public Todo createTodo( @RequestBody Todo todo) {
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    @GetMapping(value="/todos/{id}")
    public ResponseEntity<Todo> getTodoByTaskId(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> ResponseEntity.ok().body(todo))
                .orElse(ResponseEntity.notFound(). build());
    }

    @PutMapping(value="/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") String id,
                                           @RequestBody Todo todo) {
        return todoRepository.findById(id)
                .map(todoData -> {
                    todoData.setTitle(todo.getTitle());
                    todoData.setCompleted(todo.getCompleted());
                    Todo updatedTodo = todoRepository.save(todoData);
                    return ResponseEntity.ok().body(updatedTodo);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value="/todos/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable("id") String id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
