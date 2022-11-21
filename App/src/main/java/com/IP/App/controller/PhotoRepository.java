package com.IP.App.controller;

import com.IP.App.Models.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface PhotoRepository extends MongoRepository<Photo, String> {

    @Query("{loginId: ?0}")
    List<Photo> getPhotosByLoginID(String loginId);

    @Query("{loginId: ?0, isDeleted: true}")
    List<Photo> getDeletedPhotosByLoginID(String loginId);

}
