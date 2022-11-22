package com.IP.App.Models;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="photos")
public class Photo {

    @Id
    private String photoId;
    //User Id
    private String loginId;
    //Name of the photo
    private String photoTitle;
    private Binary imageData;
    //Category of the photo
    private String catName;
    private Boolean isDeleted=false;
    private Boolean isFavourite=false;


    public String getPhotoId() {
        return photoId;
    }

    public void setPhotoId(String id) {
        this.photoId = id;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getPhotoTitle() {
        return photoTitle;
    }

    public void setPhotoTitle(String photoTitle) {
        this.photoTitle = photoTitle;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Boolean getFavourite() {
        return isFavourite;
    }

    public void setFavourite(Boolean favourite) {
        isFavourite = favourite;
    }

    public String getCatName() {
        return catName;
    }

    public void setCatName(String catName) {
        this.catName = catName;
    }

    public Binary getImageData() {
        return imageData;
    }

    public void setImageData(Binary imageData) {
        this.imageData = imageData;
    }
}
