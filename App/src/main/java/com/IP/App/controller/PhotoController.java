package com.IP.App.controller;

import com.IP.App.Models.Photo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class PhotoController {

    @Autowired
    PhotoRepository photoRepository;

    @PostMapping(value= "/photos/add",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Photo addPhoto(@RequestParam("photo") String photo, @RequestParam("image") MultipartFile image) throws IOException {
        Photo newImage = new ObjectMapper().readValue(photo, Photo.class);
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

    @PostMapping(value= "/photos/getallphotos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAllPhotos(@RequestBody String request){
        JSONObject requestObject = new JSONObject(request);
        JSONArray responseObject = new JSONArray();
        List photos = photoRepository.getPhotosByLoginID(requestObject.getString("loginId"));
        for (Object photo: photos)
            responseObject.put(new JSONObject(photo));

        return responseObject.toString();
    }

    @PostMapping(value= "/photos/getalldeletedphotos", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getAllDeletedPhotos(@RequestBody String request){
        JSONObject requestObject = new JSONObject(request);
        JSONArray responseObject = new JSONArray();
        List photos = photoRepository.getDeletedPhotosByLoginID(requestObject.getString("loginId"));
        for (Object photo: photos)
            responseObject.put(new JSONObject(photo));

        return responseObject.toString();
    }
}
