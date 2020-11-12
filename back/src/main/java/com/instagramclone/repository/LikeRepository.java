package com.instagramclone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
	
	List<Like> findByPostId(Long postId);

}
