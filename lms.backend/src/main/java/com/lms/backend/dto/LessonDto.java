package com.lms.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonDto {
    private Long id;
    private String title;
    private String content;
    private String mediaUrl;        // ✅ ADDED
    private Integer position;       // ✅ ADDED
    private Integer durationSeconds; // ✅ ADDED
    private Long courseId; // ✅ refers to parent course
}
