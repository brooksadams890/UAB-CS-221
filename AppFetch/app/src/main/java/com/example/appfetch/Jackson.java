package com.example.appfetch;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class Jackson {
    @JsonProperty("id")
    private int id;

    @JsonProperty("listId")
    private int listId;

    @JsonProperty("name")
    private String name;


    public Jackson(int id, int listId, String name){

        this.name = name;
        this.listId = listId;
        this.id = id;

    }
    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }
    public Jackson(){

    }
    public int getListId() {
        return listId;
    }
    public void setListId(int listId) {
        this.listId = listId;
    }
    public String getName(){
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}