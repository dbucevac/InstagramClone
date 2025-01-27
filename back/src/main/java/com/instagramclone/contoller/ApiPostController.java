package com.instagramclone.contoller;

import java.util.Arrays;
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
import com.instagramclone.dto.UserDTO;
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
import com.instagramclone.support.CommentDTOToComment;
import com.instagramclone.support.CommentToCommentDTO;
import com.instagramclone.support.LikeDTOToLike;
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
	private CommentDTOToComment toComment;
	
	@Autowired
	private CommentToCommentDTO toCommentDto;
	
	
	private static final List<String> contentTypes = Arrays.asList("image/png", "image/jpeg", "image/gif");

	//Get one post
	
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
	
	//Get all posts of one user
	
	@GetMapping
	public ResponseEntity<List<PostDTO>> getPosts(@PathVariable Long userId){
		
		List<Post> posts = postService.byUser(userId);
		return new ResponseEntity<>(toPostDto.convert(posts), HttpStatus.OK);
	}
	
	//Get picture linked to the post
	
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
	
	//Publish a post
	
	@PostMapping
	public ResponseEntity<Void> uploadPost(@RequestParam("file") MultipartFile file, @PathVariable Long userId, @RequestParam String caption){
		
		
		Optional<User> user = userService.one(userId);
		
		String fileContentType = file.getContentType();
		
		if(!user.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		if(!contentTypes.contains(fileContentType)) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
	
	//Get likes of a post
	
	@GetMapping("/{id}/likes")
	public ResponseEntity<List<LikeDTO>> getPostLikes(@PathVariable Long id, @PathVariable Long userId){
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
	
	//Like a post
	
	@PostMapping("/{id}/likes")
	public ResponseEntity<LikeDTO> like(
			@PathVariable Long userId,
			@PathVariable Long id){
		
		Optional<User> user = userService.one(userId);
		Optional<Post> post = postService.one(id);
		if(!user.isPresent()||!post.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		User userToUpdate = user.get();
		Post postToUpdate = post.get();
		
		Optional<Like> existingLike = likeService.byPostIdAndUserId(postToUpdate.getId(), userToUpdate.getId());
		
		if(existingLike.isPresent()) {
			likeService.delete(existingLike.get().getId());
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		Like like = new Like();
		Like persisted = likeService.save(like);
		
		userToUpdate.addLike(persisted);
		postToUpdate.addLike(persisted);
		likeService.save(persisted);
		userService.save(userToUpdate);
		postService.save(postToUpdate);
		
		return new ResponseEntity<>(toLikeDto.convert(persisted), HttpStatus.CREATED);
	}
	
	//Get comments of a post
	
	@GetMapping("/{id}/comments")
	public ResponseEntity<List<CommentDTO>> getPostComments(@PathVariable Long id, @PathVariable Long userId){
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
	
	//Get comment by post id
	
	@GetMapping("/{id}/comments/{commentId}")
	public ResponseEntity<CommentDTO> getPostCommentById(@PathVariable Long id, @PathVariable Long userId, @PathVariable Long commentId){
		Optional<Comment> comment = commentService.one(commentId);
		
		if(comment.isPresent()) {
			
			CommentDTO body = toCommentDto.convert(comment.get());
			return new ResponseEntity<>(body, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//Publish a comment
	
	@PostMapping("/{id}/comments")
	public ResponseEntity<CommentDTO> comment(
			@RequestBody CommentDTO comment,
			@PathVariable Long userId,
			@PathVariable Long id){
		
		if(comment.getId() != null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Optional<User> user = userService.one(userId);
		Optional<Post> post = postService.one(id);
		if(!user.isPresent()||!post.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		User userToUpdate = user.get();
		Post postToUpdate = post.get();
		
		Comment converted = toComment.convert(comment);
		Comment persisted = commentService.save(converted);
		
		userToUpdate.addComment(persisted);
		postToUpdate.addComment(persisted);
		commentService.save(persisted);
		userService.save(userToUpdate);
		postService.save(postToUpdate);
		
		return new ResponseEntity<>(toCommentDto.convert(persisted), HttpStatus.CREATED);
	}
	
	
	
	

	

}
