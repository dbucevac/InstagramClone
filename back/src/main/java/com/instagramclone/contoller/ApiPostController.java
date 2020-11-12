package com.instagramclone.contoller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.instagramclone.dto.CommentDTO;
import com.instagramclone.dto.LikeDTO;
import com.instagramclone.dto.PictureDTO;
import com.instagramclone.dto.PostDTO;
import com.instagramclone.model.Comment;
import com.instagramclone.model.Like;
import com.instagramclone.model.Picture;
import com.instagramclone.model.Post;
import com.instagramclone.model.User;
import com.instagramclone.service.CommentService;
import com.instagramclone.service.LikeService;
import com.instagramclone.service.PictureService;
import com.instagramclone.service.PostService;
import com.instagramclone.service.UserService;
import com.instagramclone.support.CommentToCommentDTO;
import com.instagramclone.support.LikeToLikeDTO;
import com.instagramclone.support.PictureDTOToPicture;
import com.instagramclone.support.PictureToPictureDTO;
import com.instagramclone.support.PostDTOToPost;
import com.instagramclone.support.PostToPostDTO;

@RestController
@RequestMapping("api/users/{userId}/posts")
public class ApiPostController {
	
	@Autowired
	private PictureService pictureService;
	
	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private LikeService likeService;
	
	@Autowired
	private CommentService commentService;

	
	@Autowired
	private PictureToPictureDTO toPictureDto;
	
	@Autowired
	private PostToPostDTO toPostDto;
	
	@Autowired
	private LikeToLikeDTO toLikeDto;
	
	@Autowired
	private CommentToCommentDTO toCommentDto;
	
	
	@GetMapping("/{id}")
	public ResponseEntity<PostDTO> getPost(@PathVariable Long id, @PathVariable Long userId){
		Optional<Post> post = postService.one(id);
		
		if(post.isPresent()) {
			if(post.get().getUser() == null ||
					!userId.equals(post.get().getUser().getId())) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			PostDTO body = toPostDto.convert(post.get());
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/{id}/picture")
	public ResponseEntity<byte[]> getPostPicture(@PathVariable Long id, @PathVariable Long userId){
		Optional<Post> post = postService.one(id);
		Optional<Picture> picture = pictureService.byPost(id);
		
		if(post.isPresent() && picture.isPresent()) {
			if(post.get().getUser() == null ||
					!userId.equals(post.get().getUser().getId())) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			PictureDTO body = toPictureDto.convert(picture.get());
			return ResponseEntity.ok()
			        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + body.getFileName() + "\"")
			        .body(body.getData());
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@PostMapping
	public ResponseEntity<Void> uploadPost(@RequestParam("file") MultipartFile file, @PathVariable Long userId, @RequestParam String caption){
		
		
		Optional<User> user = userService.one(userId);
		
		if(!user.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	    try {
	      Picture p = pictureService.save(file);    

	      User toUpdate = user.get();
			
	      Post post = new Post();
	      post.setCaption(caption);
	      post.setPicture(p);
	      p.setPost(post);
	      p.setUser(toUpdate);
	      
	      Post persisted = postService.save(post);
			
	      toUpdate.addPost(persisted);
	      postService.save(persisted);
	      userService.save(toUpdate);

    	  
	      return new ResponseEntity<>(HttpStatus.OK);
	      
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	    }
		
		
	}
	
	@GetMapping("/{id}/likes")
	public ResponseEntity<List<LikeDTO>> getLikes(@PathVariable Long id, @PathVariable Long userId){
		Optional<Post> post = postService.one(id);
		
		if(post.isPresent()) {
			if(post.get().getUser() == null ||
					!userId.equals(post.get().getUser().getId())) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			List<Like> likeList = likeService.byPostId(id);
			List<LikeDTO> likeDTOList = toLikeDto.convert(likeList);
			return new ResponseEntity<>(likeDTOList, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/{id}/comments")
	public ResponseEntity<List<CommentDTO>> getComments(@PathVariable Long id, @PathVariable Long userId){
		Optional<Post> post = postService.one(id);
		
		if(post.isPresent()) {
			if(post.get().getUser() == null ||
					!userId.equals(post.get().getUser().getId())) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
			
			List<Comment> commentList = commentService.byPostId(id);
			List<CommentDTO> commentDTOList = toCommentDto.convert(commentList);
			return new ResponseEntity<>(commentDTOList, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	
	

	

}
