package com.lms.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class MediaStorageService {

    // ✅ TEMPORARY FILE STORAGE - Later replace with AWS S3/Firebase
    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    public MediaStorageService() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create upload directory", ex);
        }
    }

    // ✅ UPLOAD FILE TO LOCAL STORAGE
    public String uploadFile(MultipartFile file, Long courseId) {
        try {
            // Generate unique filename
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Create course-specific directory
            Path courseDirectory = this.fileStorageLocation.resolve("course_" + courseId);
            Files.createDirectories(courseDirectory);

            // Save file
            Path targetLocation = courseDirectory.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            // Return file URL (in production, return cloud storage URL)
            return "/uploads/course_" + courseId + "/" + fileName;

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file", ex);
        }
    }

    // ✅ DELETE FILE
    public void deleteFile(String fileUrl) {
        try {
            // Extract filename from URL
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();

            Files.deleteIfExists(filePath);
        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file", ex);
        }
    }

    // ✅ GET FILE EXTENSION
    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}