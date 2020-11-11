package com.instagramclone.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.instagramclone.dto.CommentDTO;
import com.instagramclone.model.Comment;
import com.instagramclone.service.CommentService;


@Component
public class CommentDTOToComment implements Converter<CommentDTO, Comment> {

	@Autowired
	CommentService commentService;
	@Override
	public Comment convert(CommentDTO source) {
		// TODO Auto-generated method stub
		Long id = source.getId();
		Comment target = id == null ? new Comment() : commentService.one(id).get();
		
		if(target != null) {
			target.setId(id);
			target.setMessage(source.getMessage());
		}
		
		return target;
	}

}
