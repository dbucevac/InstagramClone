package com.instagramclone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.Comment;
import com.instagramclone.model.Post;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	
	List<Post> findByUserIdAndPostId(Long userId, Long postId);

}
