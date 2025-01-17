package com.bbap.order_room.entity.redis;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@RedisHash(value = "Room", timeToLive = 43200) // 12시간 유지
public class Room {
	@Id
	private String roomId;
	private String cafeId;
	private String roomStatus;
	private Orderer currentOrderer;
	private HashMap<Integer, Orderer> orderers; //key = empId 사용
	private List<OrderItem> orderItems;
	private Long orderNumber;
}

