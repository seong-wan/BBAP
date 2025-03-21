package com.bbap.cafe.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bbap.cafe.dto.responseDto.ResponseDto;
import com.bbap.cafe.exception.CafeEntityNotFoundException;
import com.bbap.cafe.exception.CustomException;
import com.bbap.cafe.exception.MenuEntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	//유효성 검사
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseDto> validationExceptionHandler(MethodArgumentNotValidException e) {
		ResponseDto responseBody = new ResponseDto("유효성 실패");
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}

    //존재하지 않는 카페 아이디
	@ExceptionHandler(CafeEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> cafeNotFoundExceptionHandler(CafeEntityNotFoundException e) {
		return handleException(e);
	}

	//존재하지 않는 메뉴 아이디
	@ExceptionHandler(MenuEntityNotFoundException.class)
	public ResponseEntity<ResponseDto> menuNotFoundExcptionHandler(MenuEntityNotFoundException e) {
		return handleException(e);
	}

	private ResponseEntity<ResponseDto> handleException(CustomException e) {
		ResponseDto responseBody = new ResponseDto(e.getMessage());
		return ResponseEntity.status(e.getStatusCode()).body(responseBody);
	}
}
