package com.instagramclone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findFirstByUsername(String username);
	Optional<User> findFirstByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE "
			+ "(:username IS NULL or u.username like :username )")
	List<User> searchUsers(@Param("username") String username);

	List<User> findByFollowedUsersId(Long userId);
	
	List<User> findByFollowingUsersId(Long userId);
	
	Optional<User> findByPostsId(Long postId);
	
	
}
