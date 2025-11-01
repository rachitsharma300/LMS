package com.lms.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

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
}
