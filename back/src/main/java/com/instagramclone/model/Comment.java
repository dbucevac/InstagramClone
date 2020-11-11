package com.instagramclone.model;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(columnDefinition="TEXT")
	private String message;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private User user;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private Post post;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
		if(!user.getComments().contains(this)){
			user.getComments().add(this);
		}
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
		if(!post.getComments().contains(this)){
			post.getComments().add(this);
		}
	}
	
	

}
