package com.instagramclone.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.service.PictureService;
import com.instagramclone.service.PostService;
import com.instagramclone.support.PictureDTOToPicture;
import com.instagramclone.support.PictureToPictureDTO;
import com.instagramclone.support.PostDTOToPost;
import com.instagramclone.support.PostToPostDTO;

@RestController
@RequestMapping("api/pictures")
public class ApiPictureController {
	
	@Autowired
	private PictureService pictureService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private PictureDTOToPicture toPicture;
	
	@Autowired
	private PictureToPictureDTO toPictureDto;
	
	@Autowired
	private PostDTOToPost toPost;
	
	@Autowired
	private PostToPostDTO toPostDto;
	
	
	@PostMapping("/upload")
	public ResponseEntity<Void> get(@RequestParam("file") MultipartFile file){
		
	    try {
	      pictureService.save(file);  

	      return new ResponseEntity<>(HttpStatus.OK);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	    }
		
		
	}

}
