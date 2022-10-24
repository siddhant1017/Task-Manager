package com.IP.App.Models;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
    @Id
    private String uid;
    private String username;
    private String password;
    private String email;
    private Binary image;

    public void User(String username,String password,String email,Binary image){
        this.username = this.username;
        this.password = this.password;
        this.email = this.email;
        this.image = image;
    }

    public void User(String username,String password,String email){
        this.username = this.username;
        this.password = this.password;
        this.email = this.email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = String.valueOf(uid);
    }
}
