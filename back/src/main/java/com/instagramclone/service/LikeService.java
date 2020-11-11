package com.instagramclone.service;

import java.util.List;
import java.util.Optional;

import com.instagramclone.model.Like;

public interface LikeService {
	
	List<Like> all();
	Optional<Like> one(Long id);
	Like save(Like like);
	void delete(Long id);
	List<Like> byUserIdAndPostId(Long userId, Long postId);

}