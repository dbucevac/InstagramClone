package com.instagramclone.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(columnDefinition="TEXT")
	private String caption;
	
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationDate", nullable = false)
    private Date creationDate;
	
	@ManyToOne(fetch=FetchType.EAGER)
	private User user;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
	private List<Like> likes = new ArrayList<>();
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCaption() {
		return caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	@PrePersist
	  protected void onCreate() {
		creationDate = new Date();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
		if(!user.getPosts().contains(this)){
			user.getPosts().add(this);
		}
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment comment) {
		this.comments.add(comment);
		if (!equals(comment.getPost())) {
			comment.setPost(this);
		}
	}

	public List<Like> getLikes() {
		return likes;
	}

	public void setLikes(List<Like> likes) {
		this.likes = likes;
	}
	
	public void addLike(Like like) {
		this.likes.add(like);
		if (!equals(like.getPost())) {
			like.setPost(this);
		}
	}

	
}
