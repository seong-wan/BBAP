package com.bbap.payment.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.bbap.payment.dto.response.CheckEmpResponseData;
import com.bbap.payment.dto.response.DataResponseDto;

@FeignClient(name = "hr", url = "${feign_hr}")
public interface HrServiceFeignClient {
	@GetMapping("/employees/card/{empCard}")
	ResponseEntity<DataResponseDto<CheckEmpResponseData>> checkCard(@PathVariable String empCard);

	@GetMapping("/employees/id/{empId}")
	ResponseEntity<DataResponseDto<CheckEmpResponseData>> checkId(@PathVariable int empId);
}