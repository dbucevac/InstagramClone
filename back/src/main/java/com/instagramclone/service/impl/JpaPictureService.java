package com.instagramclone.service.impl;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.model.Picture;
import com.instagramclone.repository.PictureRepository;
import com.instagramclone.service.PictureService;

@Service
public class JpaPictureService implements PictureService {
	
	@Autowired
	PictureRepository pictureRepository;

	@Override
	public Picture save(MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	    Picture FileDB = new Picture(fileName, file.getContentType(), file.getBytes());

	    return pictureRepository.save(FileDB);
	}

	@Override
	public Optional<Picture> one(Long id) {
		// TODO Auto-generated method stub
		return pictureRepository.findById(id);
	}

	@Override
	public Optional<Picture> byUser(Long userId) {
		// TODO Auto-generated method stub
		return pictureRepository.findByUserId(userId);
	}

	@Override
	public Optional<Picture> byPost(Long postId) {
		// TODO Auto-generated method stub
		return pictureRepository.findByPostd(postId);
	}

	

}
