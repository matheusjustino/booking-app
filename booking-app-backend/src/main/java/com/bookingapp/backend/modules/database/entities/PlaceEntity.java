package com.bookingapp.backend.modules.database.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;
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

    /*@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    private List<PlaceImageEntity> placeImages;*/
    @Column
    private List<String> photos;

    @Column(nullable = false)
    private String description;

    @Column()
    private List<String> perks;

    @Column()
    private String extraInfo;

    @Column()
    private Integer checkIn;

    @Column()
    private Integer checkOut;

    @Column()
    private Integer maxGuests;

    @Column(nullable = false, precision = 2)
    private Double price;
}
