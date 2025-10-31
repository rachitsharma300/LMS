package com.lms.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    // text content (short/long)
    @Column(columnDefinition = "TEXT")
    private String content;

    // optional media (video/pdf/image) stored externally (S3/Uploadcare) - store URL
    private String mediaUrl;

    // position/order within course lessons
    private Integer position = 0;

    // duration in seconds (if video)
    private Integer durationSeconds;

    // the parent course
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    @JsonBackReference
    private Course course;
}
