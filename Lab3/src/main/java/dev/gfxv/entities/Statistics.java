package dev.gfxv.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Getter
@Setter
@AllArgsConstructor
public class Statistics implements Serializable {
    private long total;
    private long hits;
    private long misses;
}
