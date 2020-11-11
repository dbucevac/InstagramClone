package com.instagramclone.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.instagramclone.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	Optional<User> findFirstByUsername(String username);
	
	@Query("SELECT u FROM User u WHERE "
			+ "(:username IS NULL or u.username like :username )")
	List<User> searchUsers(String username);
	
	@Query("SELECT u FROM User u JOIN u.followers f WHERE u.id = :userId")
	List<User> findFollowersByUserId(Long userId);

}
