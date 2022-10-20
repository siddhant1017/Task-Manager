package com.IP.App.controller;

import com.IP.App.Functions.Function;
import com.IP.App.User;
import org.bson.types.Binary;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.IP.App.Functions.Function.sha256;

@RestController
public class PrimaryController {

    @Autowired
    UserRepository repo;

    @RequestMapping(path="/register",method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    String register(@RequestBody User user){
        Boolean duplicate = false;
        List<User> userList = repo.findAll();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status",true);
        jsonObject.put("message","success");
        for (User value : userList) {
            if (value.getEmail().equals(user.getEmail()) || value.getUsername().equals(user.getUsername())) {
                jsonObject.put("status", false);
                jsonObject.put("message", "Username or email is already taken");
                duplicate = true;
                break;
            }
        }
        if(!duplicate) {
            user.setImage(Function.convertToBinary());
            String uid = sha256(user.getUsername()+user.getPassword()+user.getEmail()+user.getImage().toString());
            user.setUid(uid);
            repo.save(user);
        }
        return jsonObject.toString();
    }

    @PostMapping(path="/login",produces = MediaType.APPLICATION_JSON_VALUE)
    String login(@RequestBody User user){
        List<User> userList = repo.findAll();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", false);
        jsonObject.put("message", "Login Failed");
        for (User value : userList) {
            if (value.getEmail().equals(user.getEmail()) && value.getPassword().equals(user.getPassword())) {
                jsonObject.put("status",true);
                jsonObject.put("message","success");
                jsonObject.put("uid",value.getUid());
                jsonObject.put("username",value.getUsername());
                jsonObject.put("email",value.getEmail());
                jsonObject.put("image",value.getImage().getData());
                break;
            }
        }
        return jsonObject.toString();
    }

    @PostMapping(path="/delete",produces = MediaType.APPLICATION_JSON_VALUE)
    String deleteUser(@RequestBody User user) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", false);
        jsonObject.put("message", "Deletion Failed");
        List<User> userList = repo.findAll();
        for (User value : userList) {
            String deleteID = user.getUid();
            if(value.getUid().equals(user.getUid())){
                repo.deleteById(deleteID);
                jsonObject.put("status",true);
                jsonObject.put("message","success");
                break;
            }
        }
        return jsonObject.toString();
    }

    @PostMapping(path="/update",produces = MediaType.APPLICATION_JSON_VALUE)
    String updateUser(@RequestBody User user) {
        String hashInput="";
        User targetUser;
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", false);
        jsonObject.put("message", "Deletion Failed");
        Optional<User> optionalTargetUser = repo.findById(user.getUid());
        if(optionalTargetUser.isPresent()) {
            targetUser = optionalTargetUser.get();
            String username = user.getUsername();
            String email = user.getEmail();
            String password = user.getPassword();
            Binary image = user.getImage();

            if(username!=null) {
                targetUser.setUsername(username);
                hashInput+=username;
            }else
                hashInput+=targetUser.getUsername();
            if(email!=null) {
                targetUser.setEmail(email);
                hashInput+=email;
            }else
                hashInput+=targetUser.getEmail();
            if(password!=null){
                targetUser.setPassword(password);
                hashInput+=password;
            }else
                hashInput+=targetUser.getPassword();
            if(image!=null) {
                targetUser.setImage(image);
                hashInput+=image;
            }else
                hashInput+=targetUser.getImage();

            targetUser.setUid(sha256(hashInput));
            repo.deleteById(user.getUid());
            repo.save(targetUser);
            jsonObject.put("status",true);
            jsonObject.put("message","success");
        }
        return jsonObject.toString();
    }
}
