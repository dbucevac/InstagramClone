package com.instagramclone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.Post;


@Repository
public interface PostRepository extends JpaRepository<Post, Long>  {

	List<Post> findByUserId(Long userId);


}
