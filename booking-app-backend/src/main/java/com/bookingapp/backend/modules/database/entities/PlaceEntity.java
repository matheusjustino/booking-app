package com.bookingapp.backend.modules.database.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Type;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "places")
public class PlaceEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private UserEntity owner;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String address;

    @Column()
    private List<String> photos;

    @Column(nullable = false)
    private String description;

    @Column(columnDefinition = "text[]")
    private List<String> perks;

    @Column()
    private String extraInfo;

    @Column(columnDefinition = "default 0")
    private Integer checkIn;

    @Column(columnDefinition = "default 0")
    private Integer checkOut;

    @Column(columnDefinition = "default 10")
    private Integer maxGuests;

    @Column(nullable = false, precision = 2)
    private Double price;
}
