package com.IP.App.Models;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="todos")
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Todo {
    @Id
    private String id;

    private String loginId;

//    @NotBlank
//    @Size(max=100)
    @Indexed(unique=true)
    private String value;

    private Boolean isCompleted = false;

    private Date createdAt = new Date();

    public Todo() {
        super();
    }

    public Todo(String value) {
        this.value = value;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return String.format(
                "Todo[id=%s, loginId=%s, value='%s', isCompleted='%s']",
                id, loginId, value, isCompleted);
    }
}