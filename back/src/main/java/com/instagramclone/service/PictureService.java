package com.instagramclone.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.model.Picture;

public interface PictureService {
	
	Picture save(MultipartFile file) throws IOException;
	Optional<Picture> one(Long id);
	Optional<Picture> byUser(Long userId);
	Optional<Picture> byPost(Long postId);

}
