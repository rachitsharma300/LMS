package com.lms.backend.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class MediaStorageService {

    @Autowired
    private AmazonS3 s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    // ✅ UPLOAD FILE TO AWS S3
    public String uploadFile(MultipartFile file, Long courseId) {
        try {
            // Generate unique filename
            String fileName = "course_" + courseId + "/" +
                    UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Upload to S3
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            s3Client.putObject(new PutObjectRequest(
                    bucketName,
                    fileName,
                    file.getInputStream(),
                    metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));

            // Return public URL
            return s3Client.getUrl(bucketName, fileName).toString();

        } catch (IOException ex) {
            throw new RuntimeException("S3 upload failed: " + ex.getMessage(), ex);
        }
    }

    // ✅ DELETE FILE FROM AWS S3
    public void deleteFile(String fileUrl) {
        try {
            // Extract file key from URL
            String fileKey = fileUrl.substring(fileUrl.lastIndexOf("/course_") + 1);
            s3Client.deleteObject(bucketName, fileKey);
        } catch (Exception ex) {
            throw new RuntimeException("S3 delete failed: " + ex.getMessage(), ex);
        }
    }
}