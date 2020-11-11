package com.instagramclone.service;

import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.model.Picture;

public interface PictureService {
	
	Picture save(MultipartFile file);
	Picture one(Long id);
	Picture byUser(Long userId);
	Picture byPost(Long postId);

}
