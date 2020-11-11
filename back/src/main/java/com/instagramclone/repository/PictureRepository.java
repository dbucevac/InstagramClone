package com.instagramclone.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.Picture;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
	
	Optional<Picture> findByUserId(Long userId);
	Optional<Picture> findByPostd(Long postId);

}
