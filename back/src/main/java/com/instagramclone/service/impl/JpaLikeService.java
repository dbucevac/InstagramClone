package com.instagramclone.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.instagramclone.model.Like;
import com.instagramclone.repository.LikeRepository;
import com.instagramclone.service.LikeService;

@Service
public class JpaLikeService implements LikeService {

	@Autowired
	LikeRepository likeRepository;
	
	@Override
	public List<Like> all() {
		// TODO Auto-generated method stub
		return likeRepository.findAll();
	}

	@Override
	public Optional<Like> one(Long id) {
		// TODO Auto-generated method stub
		return likeRepository.findById(id);
	}

	@Override
	public Like save(Like like) {
		// TODO Auto-generated method stub
		return likeRepository.save(like);
	}

	@Override
	public void delete(Long id) {
		// TODO Auto-generated method stub
		likeRepository.deleteById(id);
	}

	@Override
	public List<Like> byPostId(Long postId) {
		// TODO Auto-generated method stub
		return likeRepository.findByPostId(postId);
	}

	@Override
	public Optional<Like> byPostIdAndUserId(Long postId, Long userId) {
		// TODO Auto-generated method stub
		return likeRepository.findByPostIdAndUserId(postId, userId);
	}

}
