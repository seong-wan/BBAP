package com.bbap.hr.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employee")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_id", nullable = false)
    private Integer empId;

    @Column(name = "emp_no", nullable = false)
    private String empNo;

    @Column(name = "password", nullable = false, length = 200)
    private String password;

    @Column(name = "emp_name", nullable = false, length = 10)
    private String empName;

    @Column(name = "emp_card", nullable = true, unique = true, length = 20)
    private String empCard;

    @Column(name = "emp_image", nullable = false)
    private String empImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private DepartmentEntity department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "position_id")
    private PositionEntity position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workplace_id")
    private WorkplaceEntity workplace;
}