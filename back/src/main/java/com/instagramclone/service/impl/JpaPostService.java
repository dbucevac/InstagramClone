package com.instagramclone.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagramclone.model.Post;
import com.instagramclone.repository.PostRepository;
import com.instagramclone.service.PostService;

@Service
public class JpaPostService implements PostService{
	
	@Autowired
	PostRepository postRepository;

	@Override
	public List<Post> all() {
		// TODO Auto-generated method stub
		return postRepository.findAll();
	}

	@Override
	public Optional<Post> one(Long id) {
		// TODO Auto-generated method stub
		return postRepository.findById(id);
	}

	@Override
	public Post save(Post post) {
		// TODO Auto-generated method stub
		return postRepository.save(post);
	}

	@Override
	public List<Post> byUser(Long userId) {
		// TODO Auto-generated method stub
		return postRepository.findByUserId(userId);
	}
	
	

}
