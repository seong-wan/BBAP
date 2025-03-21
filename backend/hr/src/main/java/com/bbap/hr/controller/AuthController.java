package com.bbap.hr.controller;

import com.bbap.hr.dto.request.LoginRequestDto;
import com.bbap.hr.dto.request.LogoutRequestDto;
import com.bbap.hr.dto.request.RegisterRequestDto;
import com.bbap.hr.dto.response.DataResponseDto;
import com.bbap.hr.dto.EmployeeDto;
import com.bbap.hr.dto.response.LoginResponseData;
import com.bbap.hr.dto.response.ResponseDto;
import com.bbap.hr.service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/hr/auth")
@Tag(name = "auth", description = "인증 API")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@Valid @RequestBody RegisterRequestDto requestBody) {
        return authService.register(requestBody);

    }

    @PostMapping("/login")
    public ResponseEntity<DataResponseDto<LoginResponseData>> login(@RequestBody @Valid LoginRequestDto requestBody){
        return authService.login(requestBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<ResponseDto> logout(@RequestHeader(value = "X-Employee-Id") int empId, @RequestBody @Valid LogoutRequestDto requestBody) {
        return authService.logout(empId,requestBody);
    }

    @GetMapping("/user-info")
    public ResponseEntity<DataResponseDto<EmployeeDto>> userInfo(@RequestHeader(value = "X-Employee-Id") int empId) {
        return authService.getUserInfo(empId);
    }


}
