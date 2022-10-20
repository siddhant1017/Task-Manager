package com.IP.App.Functions;

import org.bson.types.Binary;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Function {
    public static Binary convertToBinary() {
        Binary binary;
        File fnew = new File("src/main/resources/images/profile.png");
        BufferedImage originalImage = null;
        try {
            originalImage = ImageIO.read(fnew);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(originalImage, "png", baos);
            byte[] imageInByte = baos.toByteArray();
            binary = new Binary(imageInByte);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return binary;
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static String sha256(String input) {
        final MessageDigest digest;
        String sha3Hex;
        try {
            digest = MessageDigest.getInstance("SHA3-256");
            final byte[] hashbytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            sha3Hex = bytesToHex(hashbytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        return sha3Hex;
    }

}
