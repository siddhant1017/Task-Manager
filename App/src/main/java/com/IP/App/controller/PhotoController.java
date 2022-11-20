package com.IP.App.controller;

import com.IP.App.Models.Photo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PhotoController {

    @Autowired
    PhotoRepository photoRepository;

    @PostMapping(value= "/photos/add",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Photo addPhoto(@RequestParam("photo") String photo, @RequestParam("image") MultipartFile image) throws IOException {
        Photo newImage = new ObjectMapper().readValue(photo, Photo.class);
        //Photo newImage= new Photo();
        //newImage=photo;
        newImage.setImageData(new Binary(BsonBinarySubType.BINARY,image.getBytes()));

        newImage = photoRepository.insert(newImage);
        return newImage;
    }

    @PostMapping(value= "/photos/delete")
    public ResponseEntity<Photo> deletePhoto( @RequestBody Photo photo) {
        return photoRepository.findById(photo.getPhotoId())
                .map(photoData -> {
                    photoData.setDeleted(photo.getDeleted());
                    Photo updatedPhoto = photoRepository.save(photoData);
                    return ResponseEntity.ok().body(updatedPhoto);
                }).orElse(ResponseEntity.notFound().build());
    }
}