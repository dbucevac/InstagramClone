package com.instagramclone.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagramclone.model.Comment;
import com.instagramclone.repository.CommentRepository;
import com.instagramclone.service.CommentService;

@Service
public class JpaCommentService implements CommentService{
	
	@Autowired
	CommentRepository commentRepository;

	@Override
	public List<Comment> all() {
		// TODO Auto-generated method stub
		return commentRepository.findAll();
	}

	@Override
	public Optional<Comment> one(Long id) {
		// TODO Auto-generated method stub
		return commentRepository.findById(id);
	}

	@Override
	public Comment save(Comment comment) {
		// TODO Auto-generated method stub
		return commentRepository.save(comment);
	}

	@Override
	public List<Comment> byPostId(Long postId) {
		// TODO Auto-generated method stub
		return commentRepository.findByPostId(postId);
	}

}
