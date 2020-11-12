package com.instagramclone.service;

import java.util.List;
import java.util.Optional;

import com.instagramclone.model.Comment;


public interface CommentService {
	
	List<Comment> all();
	Optional<Comment> one(Long id);
	Comment save(Comment comment);
	List<Comment> byPostId(Long postId);

}
