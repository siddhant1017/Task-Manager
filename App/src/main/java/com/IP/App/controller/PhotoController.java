package com.IP.App.controller;

import com.IP.App.Models.Photo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.tomcat.util.json.JSONParser;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class PhotoController {

    @Autowired
    PhotoRepository photoRepository;

    @PostMapping(value= "/photos/add",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Photo addPhoto( Photo photo, @RequestParam("image") MultipartFile image) throws IOException {
       // Photo newImage = new ObjectMapper().readValue(photo, Photo.class);
        Photo newImage= new Photo();
        newImage.setImageData(new Binary(BsonBinarySubType.BINARY,image.getBytes()));

        newImage = photoRepository.insert(newImage);
        return newImage;
    }
}
