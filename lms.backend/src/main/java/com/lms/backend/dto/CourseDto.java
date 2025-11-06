package com.lms.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String coverImageUrl;
    private boolean approved;
    private Long instructorId;      // ✅ for linking instructor
    private String instructorName;  // ✅ optional (for displaying instructor name)
    private LocalDateTime createdAt;  // ✅ ADDED
    private LocalDateTime updatedAt;  // ✅ ADDED
    private Integer enrollmentCount;  // ✅ ADDED

    private String category;
    private String level;
    private Double rating;
    private Integer totalStudents;
    private String duration;
    private Double price;
}
