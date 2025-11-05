package com.lms.backend.service;

import com.lms.backend.model.Lesson;
import java.util.List;

/**
 * LessonService Interface
 *
 * Yeh interface Lesson related saari business logic methods define karta hai.
 * LessonServiceImpl class is interface ko implement karegi.
 */
public interface LessonService {

    /**
     * ✅ Course ID ke through us course ke saare lessons get kare
     * @param courseId - Jis course ke lessons chahiye
     * @return List of Lesson objects
     */
    List<Lesson> getLessonsByCourseId(Long courseId);

    /**
     * ✅ Lesson ID se specific lesson ka data get kare
     * @param id - Lesson ka unique ID
     * @return Lesson object
     * @throws RuntimeException agar lesson nahi mila toh
     */
    Lesson getLessonById(Long id);

    /**
     * ✅ Naya lesson create kare specific course ke liye
     * @param courseId - Jis course mein lesson add karna hai
     * @param lesson - Lesson ka data
     * @return Saved Lesson object
     */
    Lesson createLesson(Long courseId, Lesson lesson);

    /**
     * ✅ Existing lesson ko update kare
     * @param id - Lesson ka ID jo update karna hai
     * @param lessonDetails - Updated lesson data
     * @return Updated Lesson object
     */
    Lesson updateLesson(Long id, Lesson lessonDetails);

    /**
     * ✅ Lesson delete kare
     * @param id - Lesson ka ID jo delete karna hai
     * @throws RuntimeException agar lesson nahi mila toh
     */
    void deleteLesson(Long id);
}